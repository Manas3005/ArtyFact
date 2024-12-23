# ArtyFact

The site is a place for the user to explore new art, and read about various artworks. Users can create and edit art collections that store multiple artworks, allowing the user to group artworks accordinding to their liking. Users will be able to create journal entries, these journal entries serve as a place to write down their thoughts about art pieces. Users will have to login to be able to save their collections and journal entries so that they can check it again when they login. Users who are not sure of what they like can take the art quiz, so that they can get recommended artworks that would be interesting to their taste and appreciation. Users can search for artworks, or “explore” by category to get to know more about artpieces and increase their knowledge!

Project Setup Instructions

### **Step 1: Install Node.js**

1.  Download and install **Node.js** from the official website: [https://nodejs.org/](https://nodejs.org/)
    

Verify the installation by running the following commands in your terminal:

```node -v```

```npm -v```

### **Step 2: Initialize the Project (if not already initialized)**

If you don't have a package.json file in your project directory yet, run:

```npm init -y```

### **Step 3: Install Dependencies**

Install all the dependencies specified in the package.json file (both **dependencies** and **devDependencies**) by running:

```npm install```

### **Step 4: Run the Development Server**

To start the development server with **Vite**, run:

```npm run dev```

This will start the app in development mode and you can access it in your browser.

### **Step 5: Build the Project for Production**

When you're ready to build the project for production, run:

```npm run build```

This will generate the production build in the dist/ folder.

### **Step 6: Preview the Production Build Locally**

To preview the production build locally, use the following command:

```npm run serve```

### **Step 7 (Optional) Clean Installation (if needed)**

If you encounter issues with the installed packages, you can perform a clean installation by removing the node\_modules folder and the package-lock.json file, then reinstalling everything:

```rm -rf node\_modules package-lock.json```

```npm install```

### ThirdPartyComponents : (By MUI) 

*   **SideBarNav.jsx** in **code**, view shown upon clicking “Explore” in **view** 
    

It opens a sidebar panel when the user presses the explore button . This side panel will include style choices (application specific) that the user can choose between. 

*   **LinearProgressWithLabel.jsx** in **code**, **view** at the top of the art quiz.
    

A progress bar that helps users keep track of the quiz progress.







