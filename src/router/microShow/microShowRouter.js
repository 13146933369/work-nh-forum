let microShow = [];
const microShowDefault = {
    path: "/microShow/microShowDefault",
    name: "microShowDefault",
    component: () => import("../../views/microShow/MicroShowDefault.vue"),
    meta: { title: "微展示" }
}
const microShowDetails = {
    path: "/microShow/microShowDetails",
    name: "MicroShowDetails",
    component: () => import("../../views/microShow/MicroShowDetails.vue"),
    meta: { title: "微展示详情页" }
}

const microShowUploading = {
    path: "/microShow/microShowUploading",
    name: "MicroShowUploading",
    component: () => import("../../views/microShow/MicroShowUploading.vue"),
    meta: { title: "微展示上传" }
}

microShow.push(microShowDefault,microShowDetails,microShowUploading);
export { microShow };
