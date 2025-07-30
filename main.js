import { Tree } from "./tree.js";
// import { Node } from "./node.js";

// const n = new Node(5);
// console.log(n);

const testArray = [7, 3, 1, 4, 6, 2, 5];
const tree = new Tree(testArray);

tree.prettyPrint();

console.log(tree.find(2)); // Should return the node with data 4

// tree.levelOrderForEach((node) => {
//   console.log(node.data + " is a node in the tree.");
// });

console.log(tree.depth(4)); 


// tree.postOrderForEach((node) => {
//   console.log(node.data + " is a node in postOrder");
// });
