let microFourm = [];
const microFourmDefault = {
    path: "/microFourm/microFourmDefault",
    name: "microFourmDefault",
    component: () => import("../../views/microFourm/MicroFourmDefault.vue"),
    meta: { title: "微论坛" }
}

const microFourmUploading = {
    path: "/microFourm/microFourmUploading",
    name: "microFourmUploading",
    component: () => import("../../views/microFourm/MicroFourmUploading.vue"),
    meta: { title: "微论上传" }
}

const microFourmDetails = {
    path: "/microFourm/microFourmDetails",
    name: "microFourmDetails",
    component: () => import("../../views/microFourm/MicroFourmDetails.vue"),
    meta: { title: "微论详情页" }
}

microFourm.push(microFourmDefault,microFourmUploading,microFourmDetails);

export { microFourm };



