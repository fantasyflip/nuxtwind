const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const readline = require("readline");
const dotenv = require("dotenv");
const yaml = require("yaml");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt the user for input
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

// Function to encode a string in base64
const base64Encode = (str) => Buffer.from(str).toString("base64");

// Function to read and update package.json
const updatePackageJson = (key, value) => {
  const packageJsonPath = path.resolve(__dirname, "../package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  if (!packageJson.k8s) {
    packageJson.k8s = {};
  }
  packageJson.k8s[key] = value;

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    "utf8",
  );
};

// Function to check if a directory exists
const checkDirectoryExists = (dirPath) => {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
};

// Function to update deployment.json
const updateDeploymentJson = (envConfig, secretName) => {
  const deploymentJsonPath = path.resolve(
    __dirname,
    "../deployment/pod/deployment.json",
  );
  const deploymentJson = JSON.parse(
    fs.readFileSync(deploymentJsonPath, "utf8"),
  );

  const envVars = Object.keys(envConfig).map((key) => ({
    name: key,
    valueFrom: {
      secretKeyRef: {
        key: key,
        name: secretName,
      },
    },
  }));

  deploymentJson.spec.template.spec.containers[0].env = envVars;

  fs.writeFileSync(
    deploymentJsonPath,
    JSON.stringify(deploymentJson, null, 2),
    "utf8",
  );
  console.log(`Updated deployment.json with environment variables`);
};

// Main function
const main = async () => {
  // Check if the deployment directory exists
  const deploymentDir = path.resolve(__dirname, "../deployment/pod");
  if (!checkDirectoryExists(deploymentDir)) {
    console.log(
      "Deployment directory does not exist. Please run 'pnpm k8s-init'.",
    );
    process.exit(1);
  }

  const packageJsonPath = path.resolve(__dirname, "../package.json");
  let packageJson;

  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  } catch (error) {
    console.error("Error reading package.json:", error.message);
    process.exit(1);
  }

  let namespace = packageJson.k8s?.namespace;
  let secretName = packageJson.k8s?.secretName;

  if (!namespace) {
    namespace = await prompt("Enter the namespace: ");
    updatePackageJson("namespace", namespace);
  }

  if (!secretName) {
    secretName = await prompt("Enter the secret name: ");
    updatePackageJson("secretName", secretName);
  }

  // Load environment variables from .env file
  const envFilePath = path.resolve(__dirname, "../.env");
  const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

  const outputFilePath = path.resolve(__dirname, `../${secretName}.yaml`);
  const sealedOutputFilePath = path.resolve(deploymentDir, "env.yaml");

  // Create the secret data object
  const secretData = {};
  for (const [key, value] of Object.entries(envConfig)) {
    secretData[key] = base64Encode(value);
  }

  // Create the Kubernetes secret manifest
  const k8sSecret = {
    apiVersion: "v1",
    kind: "Secret",
    metadata: {
      name: secretName,
      namespace: namespace,
    },
    type: "Opaque",
    data: secretData,
  };

  // Write the secret manifest to a YAML file
  fs.writeFileSync(outputFilePath, yaml.stringify(k8sSecret), "utf8");
  console.log(`Kubernetes secret manifest created at ${outputFilePath}`);

  // Update deployment.json with environment variables
  updateDeploymentJson(envConfig, secretName);

  // Run kubeseal on the YAML file
  exec(
    `kubeseal --format=yaml < ${outputFilePath} > ${sealedOutputFilePath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running kubeseal: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`kubeseal stderr: ${stderr}`);
        return;
      }
      console.log(`Sealed secret created at ${sealedOutputFilePath}`);

      // Delete the unsealed secret YAML file
      fs.unlinkSync(outputFilePath);
      console.log(`Unsealed secret YAML file ${outputFilePath} deleted`);
    },
  );

  // Close the readline interface
  rl.close();
};

// Run the main function
main();
