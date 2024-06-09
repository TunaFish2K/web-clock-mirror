// @ts-check

/**
 * @readonly
 * @enum { string }
 */
const ResourceType = {
    IMAGE: "image",
    TEXT: "text",
    JSON: "json"
}

class Resource {
    /**
     * @type { string } the name of the resource.
     */
    name;
    /**
     * @type { ResourceType } the type of the resource.
     */
    type;
    /**
     * @type { any } the real data of the resource.
     */
    data;

    /**
     * create a resource with the given names.
     * @param { string } name
     * @param { ResourceType } type  
     */
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    /**
     * load the data.
     * @returns { Promise<Resource> }
     */
    load() {
        return new Promise((resolve, reject) => {
            const path = "/resources/" + this.name;
            if (this.type == ResourceType.IMAGE) {
                const image = new Image();
                image.src = path;
                image.onload = () => {
                    this.data = image;
                    resolve(this);
                };
                image.onerror = (event, source, lineno, colno, error) => {
                    reject(new Error(`Error when loading image: ${error}`));
                }
                return;
            }

            const request = new XMLHttpRequest();
            // @ts-ignore
            request.responseType = "text";
            request.open("GET", path);
            request.send();
            request.onreadystatechange = () => {
                if (request.readyState != 4) return;
                if (request.status != 200) return reject(new Error(`load resource failed for ${request.status} ${request.statusText}!`));
                if (this.type==ResourceType.JSON) {
                    this.data = JSON.parse(request.responseText);
                } else {
                    this.data = request.responseText;
                }
                
                resolve(this);
            };
            request.onerror = () => {
                reject("fail to load resource!");
            }
        });
    }
}

class ResourceLoader {
    /**
     * load a set of Resources from a manifest json file.
     * @param { string } name the name of the manifest without manifest/ prefix.
     * @returns { Promise<Map<string, Resource>> }
     */
    static async loadFromManifest(name) {
        /**
         * the resources.
         * @type { Map<string, Resource> }
         */
        const resourceMap = new Map();
        const manifest = await (new Resource(`manifest/${name}`, ResourceType.JSON).load());
    
        for (const resourceId of Object.keys(manifest.data.values)) {
            /**
             * the resource's full name.
             * @type { string }
             */
            const resourceName = manifest.data.prefix + manifest.data.values[resourceId];
            const resource = new Resource(resourceName, manifest.data.type);
            resourceMap.set(resourceId, resource);
        }

        await Promise.all((()=>{
            /**
             * @type { Promise<Resource>[] }
             */
            const promises = [];
            for (const resource of resourceMap.values()) {
                promises.push(resource.load());
            }
            return promises;
        })());

        return resourceMap;
    }
}
/**
 * @type { {[manifest:string]: Map | null} }
 */
export const RESOURCES = {
    LANG: null
};

export async function loadAll() {
    RESOURCES.LANG = await ResourceLoader.loadFromManifest("lang.json");
}; 