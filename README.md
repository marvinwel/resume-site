# Marvin Wellington — Resume Site

This is the source for my personal website, where I showcase my work history, technical skills, and projects.

## About Me

I'm a cloud engineer with about four years of experience at IBM, currently pursuing a Master's in Computer Science at the University of Texas at Arlington. My work focuses on cloud infrastructure, AWS, edge solutions, and generative AI applications, including retrieval-augmented generation (RAG) pipelines and agentic workflows built with LangChain and LangGraph.

## What's on the Site

- **Work history:** roles, responsibilities, and accomplishments
- **Skills:** cloud platforms, DevOps tooling, programming languages, and AI/ML
- **Projects:** selected personal, academic, and professional work

## How It's Built and Deployed

The site is a static website hosted on AWS:

- **Amazon S3** stores the site files
- **GitHub Actions** deploys automatically on every push to `main`
- **OIDC authentication** lets GitHub assume an IAM role, so no AWS access keys are stored in the repository

### Deployment Flow

```
git push → GitHub Actions → assume IAM role (OIDC) → aws s3 sync → S3 bucket
```

The workflow lives in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Contact

Feel free to reach out through the contact information on the site.