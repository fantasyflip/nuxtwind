const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Function to create directory if it doesn't exist
function createDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Function to read values from package.json
function getK8sConfig() {
  const packageJsonPath = path.join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  return packageJson.k8s || {};
}

// Function to update package.json with k8s config
function updateK8sConfig(namespace, serviceName, appName, infraRepo, ghEmail) {
  const packageJsonPath = path.join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.k8s = { namespace, serviceName, appName, infraRepo, ghEmail };
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    "utf8",
  );
}

// Function to prompt the user for input
function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
}

// Main function to generate files
async function main() {
  let k8sConfig = getK8sConfig();
  let { namespace, serviceName, appName, infraRepo, ghEmail } = k8sConfig;

  if (!namespace) {
    namespace = await prompt("Enter Kubernetes namespace: ");
  }
  if (!serviceName) {
    serviceName = await prompt("Enter Kubernetes service name: ");
  }
  if (!appName) {
    appName = await prompt("Enter Kubernetes app name: ");
  }
  if (!infraRepo) {
    infraRepo = await prompt("Enter Infra Repo: ");
  }
  if (!ghEmail) {
    ghEmail = await prompt("Enter GitHub email: ");
  }

  // Update package.json with new values
  updateK8sConfig(namespace, serviceName, appName, infraRepo, ghEmail);

  // Ingress JSON content
  const ingressJsonContent = JSON.stringify(
    {
      apiVersion: "networking.k8s.io/v1",
      kind: "Ingress",
      metadata: {
        name: "ingress-nginx-controller",
        namespace: namespace,
      },
      spec: {
        ingressClassName: "nginx",
        rules: [
          {
            host: "nuxt-basic.fantasyflip.de",
            http: {
              paths: [
                {
                  path: "/",
                  pathType: "Prefix",
                  backend: {
                    service: {
                      name: serviceName,
                      port: {
                        number: 3000,
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    null,
    2,
  );

  // Deployment JSON content
  const deploymentJsonContent = JSON.stringify(
    {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: appName,
        namespace: namespace,
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: appName,
          },
        },
        template: {
          metadata: {
            labels: {
              app: appName,
            },
          },
          spec: {
            imagePullSecrets: [
              {
                name: "ghcr-secret",
              },
            ],
            containers: [
              {
                name: appName,
                image: "ghcr.io/user/repo:branch-hash",
                env: [],
                ports: [
                  {
                    containerPort: 3000,
                  },
                ],
                resources: {
                  requests: {
                    cpu: "500m",
                    memory: "750Mi",
                  },
                  limits: {
                    cpu: "1000m",
                    memory: "1000Mi",
                  },
                },
              },
            ],
          },
        },
      },
    },
    null,
    2,
  );

  // Service YAML content
  const serviceYamlContent = `apiVersion: v1
kind: Service
metadata:
  name: ${serviceName}
  namespace: ${namespace}
spec:
  type: ClusterIP
  ports:
    - port: 3000
      protocol: TCP
      targetPort: 3000
  selector:
    app: ${appName}
`;

  // GitHub Action workflow content
  const githubActionContent = `name: Dockerize and Push to Infra-Repo

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Use Dockerize and Push to Infra-Repo Action
        uses: fantasyflip/k8s-build-transfer@v1.2.0
        with:
          node-version: 18
          infra-repo: "${infraRepo}"
          gh-token: \${{ secrets.GH_TOKEN }}
          gh-email: "${ghEmail}"
          namespace: "${namespace}"
          app-name: "${appName}"
`;

  const rootDir = path.join(__dirname, "..");
  const deploymentDir = path.join(rootDir, "deployment");
  const podDir = path.join(deploymentDir, "pod");
  const githubDir = path.join(rootDir, ".github", "workflows");

  // Create directories
  createDirectory(deploymentDir);
  createDirectory(podDir);
  createDirectory(githubDir);

  // Write files
  fs.writeFileSync(
    path.join(deploymentDir, "ingress.json"),
    ingressJsonContent,
  );
  fs.writeFileSync(path.join(podDir, "deployment.json"), deploymentJsonContent);
  fs.writeFileSync(path.join(podDir, "service.yaml"), serviceYamlContent);
  fs.writeFileSync(
    path.join(githubDir, "dockerize-and-push.yml"),
    githubActionContent,
  );

  console.log("Files created successfully");
}

// Run the main function
main();
