import { ResourcesJSON } from "../../resource_manager/loader";
import { SceneResources } from "../advanced/advanced"

export const importResources = (json: ResourcesJSON): SceneResources => {
    return {
        audio: json.audio,
        models3d: json.models3d
    }
}
