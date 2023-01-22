const fs = require("fs")
const JSZip = require("jszip")
const yaml = require("js-yaml")
let list = []
fs.readdir(__dirname, async function (err, files) {
    await files.forEach(async file => {
        if (!file.endsWith(".qp")) return
        // read file as zip
        let data = await fs.readFileSync(file)
        let zip = await JSZip.loadAsync(data)

        zip.forEach((path, file) => {
            if (file.name.endsWith(".qua")) {
                file.async("string").then((data) => {
                    let parsed = yaml.load(data)
                    list.push(parsed)
                })
                return
            }
        })
        console.log("finished parsing " + file)
    });
    fs.writeFileSync("list.json", JSON.stringify(list))
})
