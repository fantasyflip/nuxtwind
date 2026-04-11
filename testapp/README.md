# Nuxt 4 Basic Starter

This repository includes a basic starter for Nuxt 4 with Tailwind CSS, i18n, linting, and Open Graph.

[Feature Overview](https://nuxt-basic.fantasyflip.de)

## Kubernetes Deployment

This repository is K8S-Ready, utilizing the following GitHub Actions and a K8S-Infra-Repo:

- [fantasyflip/k8s-build-transfer](https://github.com/fantasyflip/k8s-build-transfer)
- [fantasyflip/k8s-receive-apply](https://github.com/fantasyflip/k8s-receive-apply)

## Kubernetes Configuration Script

This repository includes a script to generate Kubernetes configuration files and a GitHub Action workflow. The script reads configuration values from the `package.json` file or prompts the user for input if the values are missing. The generated files include:

- A Kubernetes Ingress JSON file in `/deployment`
- A Kubernetes Deployment JSON file in `/deployment/pod`
- A Kubernetes Service YAML file in `/deployment/pod`
- A GitHub Action workflow file in `.github/workflows`

### Prerequisites

- Node.js (version 14 or higher)
- pnpm (version 6 or higher)

### Usage

1. **Run the script using `pnpm`:**

   ```bash
   pnpm k8s-init
   ```

2. **The script will check for the `k8s` configuration in `package.json`.** If any of the following values are missing, the script will prompt you to enter them:

   - Kubernetes namespace (`k8s.namespace`)
   - Kubernetes service name (`k8s.serviceName`)
   - Kubernetes app name (`k8s.appName`)
   - Infra repo (`k8s.infraRepo`)

3. **The script updates `package.json` with the provided values** and generates the necessary Kubernetes configuration files and GitHub Action workflow file using these values.

### Example

Here's an example of the `k8s` configuration in `package.json`:

```json
{
  "k8s": {
    "namespace": "nuxt-template",
    "serviceName": "nuxt-basic-starter-service",
    "appName": "nuxt-basic-starter",
    "infraRepo": "fantasyflip/k8s-infra"
  }
}
```

### Generated Files

- **Ingress JSON file:** `deployment/ingress.json`
- **Deployment JSON file:** `deployment/pod/deployment.json`
- **Service YAML file:** `deployment/pod/service.yaml`
- **GitHub Action workflow file:** `.github/workflows/dockerize-and-push.yml`

### Notes

- Ensure your repository has the necessary GitHub secrets (e.g., `GH_TOKEN`) configured for the GitHub Action to work correctly.
- This script helps streamline the process of generating Kubernetes configuration files and setting up a CI/CD pipeline using GitHub Actions.

## Kubernetes Secrets Management Script

This repository includes a script to manage Kubernetes secrets. The script reads environment variables from a `.env` file, creates a Kubernetes secret YAML file, seals it using `kubeseal`, and updates the `deployment.json` file with the environment variables.

### Prerequisites

Ensure you have the following installed:

- Node.js
- pnpm (for running the `k8s-init` and `seal` commands)
- kubeseal

### Setup

1. **.env File**:

   - Ensure you have a `.env` file at the root of your repository containing the necessary environment variables.

2. **Directory Structure**:
   - Ensure the `/deployment/pod/` directory exists. If it doesn't, you will be prompted to run `pnpm k8s-init` to set it up.

### Script Usage

1. **Run the script using pnpm**:
   ```bash
   pnpm seal
   ```

### Script Details

- **Reads environment variables** from the `.env` file.
- **Creates a Kubernetes secret** manifest file.
- **Seals the secret** using `kubeseal`.
- **Updates the `deployment.json`** file with the environment variables under `spec.template.spec.containers[0].env`.
- **Stores namespace and secret name** in `package.json` to avoid repeated prompts.

### Example `.env` File

```env
# .env
NUXT_PUBLIC_I18N_BASE_URL=https://example.com
ANOTHER_ENV_VAR=value
```

### Example `deployment.json` Update

The script will add environment variables to `deployment.json` under `spec.template.spec.containers[0].env` like this:

```json
"env": [
  {
    "name": "NUXT_PUBLIC_I18N_BASE_URL",
    "valueFrom": {
      "secretKeyRef": {
        "key": "NUXT_PUBLIC_I18N_BASE_URL",
        "name": "nuxt-basic-starter-env-secrets"
      }
    }
  },
  {
    "name": "ANOTHER_ENV_VAR",
    "valueFrom": {
        "key": "ANOTHER_ENV_VAR",
        "name": "nuxt-basic-starter-env-secrets"
      }
    }
  }
]
```

### Notes

- If the `/deployment/pod/` directory does not exist, the script will prompt you to run `pnpm k8s-init`.
- The script will delete the unsealed secret YAML file after sealing it.
- The namespace and secret name will be stored in `package.json` for future use.

## Nuxt 4 Usage Information

Refer to the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) for more information.

### Install Dependencies

```bash
# Using pnpm
pnpm install
```

### Development Server

Start the development server at `http://localhost:3000`:

```bash
# Using pnpm
pnpm dev
```

### Production

Build the application for production:

```bash
# Using pnpm
pnpm build
```

Preview the production build locally:

```bash
# Using pnpm
pnpm preview
```

For more details, check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment).
