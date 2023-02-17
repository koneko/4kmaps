const fs = require("fs")
const JSZip = require("jszip")
const yaml = require("js-yaml")
let list = []
fs.readdir(__dirname, async function (err, files) {
    await files.forEach(async topfile => {
        if (!topfile.endsWith(".qp")) return
        // read file as zip
        let data = await fs.readFileSync(topfile)
        let zip = await JSZip.loadAsync(data)

        zip.forEach((path, file) => {
            if (file.name.endsWith(".qua")) {
                // only the first one

                file.async("string").then((data) => {
                    let parsed = yaml.load(data)
                    list.push({
                        title: parsed.Title,
                        artist: parsed.Artist,
                        mapId: parsed.MapId,
                        mapSetId: parsed.MapSetId,
                        difficultyName: parsed.DifficultyName,
                        file: topfile
                    })
                })
            }
            // if ends in .png or .jpg, save it to images folder
            if (file.name.endsWith(".png") || file.name.endsWith(".jpg")) {
                file.async("nodebuffer").then((data) => {
                    fs.writeFileSync(__dirname + "/images/" + file.name.split(".")[0] + file.split(".")[1], data)
                })
            }
        })
        // if list has duplicates, remove them (only keep the first one) (match with title)
        console.log("finished parsing " + topfile)
    });
    setTimeout(() => {
        list = list.filter((thing, index, self) => index === self.findIndex((t) => (t.title === thing.title)))
        // wait for all files to be parsed
        fs.writeFileSync("list.json", JSON.stringify(list))
    }, 2000);
})
