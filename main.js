import { Tree } from "./tree.js";
// import { Node } from "./node.js";

const arr = [1, 2, 3, 4, 5, 6, 7];
const tree = new Tree(arr);

tree.insert(0);
tree.prettyPrint();

tree.deleteItem(0);

tree.prettyPrint();

// tree.levelOrderForEach((node) => {
//   console.log(node.data);
// });
