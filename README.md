PhD Report Management System - React + Vite + Springboot + PostgreSQL
This project is a PhD Report Management System built with React and Vite, providing a fast and modern frontend setup with Hot Module Replacement (HMR) and ESLint support where the backend built with Springboot and databse is PostgresSQL.

Project Overview
The system is organized into four main modules, each with its own dedicated dashboard and role-based access:

1. Admin Module
Responsible for authenticating and verifying users before access.

Can upload notices visible across all modules.

2. Coordinator Module
Manages user lifecycle: add, edit, or delete PhD Scholars and RAC Members.

Generates PhD reports and forwards them to RAC Members for verification.

3. RAC Members Module
Views submitted reports and can approve or reject them.

Upon final approval, automatically inserts a non-digital signature image at the correct location in the report.

4. Scholar Module
Views finalized reports after RAC approval.

Receives reports sent back from the Coordinator once approved.

Expanding the ESLint Configuration
For production-ready development, it's recommended to use TypeScript with type-aware linting rules using typescript-eslint. You can check out the React + TypeScript template for a more robust setup.

Dashboard Screenshots
Here are the dashboard images for each user role in the system:

Landing Page 


![Screenshot 2025-05-22 165507](https://github.com/user-attachments/assets/1248df7f-1ce4-4909-8f34-5667fe79135a)


Admin Dashboard



![Screenshot 2025-05-22 165805](https://github.com/user-attachments/assets/bdc362d9-7c88-4599-aa1b-44cef75f3a1b)

Coordinator Dashboard


![Screenshot 2025-05-22 165610](https://github.com/user-attachments/assets/0182e607-351b-454b-8b5a-f0e163fa5587)


RAC Members Dashboard


![Screenshot 2025-05-22 165729](https://github.com/user-attachments/assets/ab433946-c8cc-4405-b056-102495e3c931)


Scholar Dashboard


![Screenshot 2025-05-22 165729](https://github.com/user-attachments/assets/4fc5ffef-0bee-4c40-844c-ad1e90fbf078)


Available Plugins

This project currently supports the following Vite official plugins for React:

@vitejs/plugin-react (Babel for Fast Refresh)

@vitejs/plugin-react-swc (SWC for Fast Refresh)
