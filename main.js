import { Tree } from "./tree.js";
import { Node } from "./node.js";

// const n = new Node(5);
// console.log(n);

const root = new Node(10);
console.log(root);

const arr = [1, 7, 4];
console.log(arr);
const sorted = [...new Set(arr)].sort((a, b) => a - b);
console.log(sorted);
