# 📁 TEXTIFY - A Next.js File Explorer

A Next.js-based file explorer with a nested folder and file system. It supports file and folder creation, deletion, and text file editing with persistence using Redux and localStorage.

## 🚀 Features

### 📌 **File & Folder Management**

- Create folders and files within the directory structure.
- Right-click context menu to create files, create folders, or delete folders.
- Files have only a delete option.
- Uses a modal to input names for new files and folders.

### 📝 **File Editing & Persistence**

- `.txt` files can be opened and edited.
- Clicking a file opens it in the main area as a tab.
- If a file is already open, clicking highlights the existing tab instead of opening a new one.
- Edited files can be saved and stored in `localStorage`.

### 🗑 **Deletion Handling**

- Deleting a single file removes it from the file system and active tabs.
- Deleting a folder removes all nested files and folders.
- Open files within a deleted folder are closed automatically.

## 🛠️ Project Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/rams2351/Textify.git
cd textify-main
```

### **2️⃣ Install Dependencies**

```bash
yarn install  # or npm install
```

### **3️⃣ Run the Project**

```bash
yarn dev  # or npm run dev
```

### **4️⃣ Build for Production**

```bash
yarn build  # or npm run build
```

## ⚡ Redux Actions Overview

### `addItem`

Adds a new file or folder to the file system.

### `deleteItem`

Removes a file or folder, including all nested items if applicable.

### `toggleFolder`

Expands or collapses a folder in the file explorer.

### `openFile`

Opens a `.txt` file in a new tab.

### `closeFile`

Closes an open file tab.

### `updateFileContent`

Updates the content of a text file in Redux state.

### `saveFile`

Saves the edited file content to `localStorage`.

## 🎯 Usage Guide

1. **Right-click on folders** to create files/folders or delete them.
2. **Right-click on files** to delete them.
3. **Click on a **\*\*\***\*`.txt`**\*\*\*\*\*\* file\*\* to open it in the editor.
4. **Edit the text file** and click "Save" to persist changes.
5. **Delete a folder** to remove all files inside it, including open tabs.

---

Made with ❤️ using Next.js, Redux, and TypeScript. 🚀
