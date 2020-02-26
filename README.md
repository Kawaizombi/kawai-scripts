### Kawai user scripts

Awesome user scripts for your browser

### List

| Name | Description | Install url | 
|------|-------------|-------------|
| [Hover zoom](./projects/hover-zoom#readme) | Show image preview on link hover | [Install](./dist/hover-zoom.user.js?raw=true) |
| [AnimeSpirit ost downloader](./projects/animespirit-ost-downloader#readme) | Adds bulk download for www.animespirit.ru/ost and www.animespirit.su/ost | [Install](./dist/animespirit-ost-downloader.user.js?raw=true) |
| [Youtube blocker](./projects/youtube-blocker#readme) | Adds the ability to block youtube videos from specific channels and users | [Install](./dist/youtube-blocker.user.js?raw=true) |
| [Get Qr code](./projects/get-qrcode#readme) | Generates QR code for page | [Install](./dist/get-qrcode.user.js?raw=true) |
| [SoundCloud downloader](./projects/soundcloud-downloader#readme) | Adds the ability to download any track or playlist from soundcloud.com | [Install](./dist/soundcloud-downloader.user.js?raw=true) |

Note: If you don't have browser plugin to run user scripts install one listed bellow

| Browser | Install url |
|---------|-------------|
| Firefox | [Tampermonkey](https://addons.mozilla.org/ru/firefox/addon/tampermonkey/) or [Violentmonkey](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/) |
| Chrome  | [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) |
| Safari  | [Tampermonkey](https://www.tampermonkey.net/?ext=dhdg&browser=safari) |
| Edge    | [Tampermonkey](https://www.microsoft.com/uk-ua/p/tampermonkey/9nblggh5162s) |

### Development

##### Setup
```shell script
npm i
npx lerna bootstrap
npx lerna run build
```

##### Build user script

Run command in terminal `npm run build:<project-name>` for example:

```shell script
npm run build:hover-zoom
```

##### Develop user script

Run command in terminal `npm run dev:<project-name>` for example:

```shell script
npm run dev:hover-zoom
```

then open dist folder and copy contents of proxy script(`<project-name>.dev.proxy.user.js`)
into your your script manager or drag and drop proxy script into browser

Also you can switch proxy to user file:// protocol with env variable for example:
```shell script
# Linux/Mac
export FILE_PROTOCOL=1

# Windows
set FILE_PROTOCOL=1
```  
