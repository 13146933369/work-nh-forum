let microClass = [];
const microClassDefault = {
    path: "/microClass/microClassDefault",
    name: "microClassDefault",
    component: () => import("../../views/microClass/MicroClassDefault.vue"),
    meta: { title: "微课堂" }
}
const microClassDetails = {
    path: "/microClass/microClassDetails",
    name: "microClassDetails",
    component: () => import("../../views/microClass/MicroClassDetails.vue"),
    meta: { title: "微课详情页" }
}

microClass.push(microClassDefault,microClassDetails);

export { microClass };
