const path = require('path');

function withThemePath(relativePath) {
    let pathResolvedPath = path.resolve(relativePath);
    let finalPath = pathResolvedPath;
    try {
        // check if the user's site has the file
        const dirname = __dirname.split(path.sep).pop();
        pathResolvedPath = pathResolvedPath.replace(`${path.sep}src`, `${path.sep}src${path.sep}${dirname}`);
        require.resolve(pathResolvedPath);
        finalPath = pathResolvedPath;
    } catch (e) {
        try {
            // if the user hasn't implemented the file,
            finalPath = require.resolve(relativePath);
        } catch (e) {
            return false;
        }
    }
    return finalPath;
}

module.exports = {
    withThemePath
};
