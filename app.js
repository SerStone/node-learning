const fs = require('node:fs/promises');
const path  = require('node:path');

const fGenMaker = async () => {
    const mainPath = path.join(process.cwd(), 'mainFolder');

    await fs.mkdir(mainPath);
    const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];
    const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];

    for (const file of fileNames) {
       await fs.writeFile(path.join(mainPath, file), 'Hello OKTEN')
    }

    for (const folder of folderNames) {
        await fs.mkdir(path.join(mainPath, folder));
    }

  const files = await fs.readdir(mainPath);
    for (const file of files) {
        const stat = await fs.stat(path.join(mainPath, file));
        console.log(path.join(mainPath, file),' : ',stat.isDirectory() ? 'folder' : 'file');
    }
}
fGenMaker();