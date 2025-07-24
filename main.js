import { Tree } from "./tree.js";
// import { Node } from "./node.js";

// const n = new Node(5);
// console.log(n);

const testArray = [7, 3, 1, 4, 6, 2, 5];
const tree = new Tree(testArray);
console.log(tree.root); // Should print the root node of the tree

tree.insert(8);
console.log(tree.root.right.right); // Should print the node with value 8

tree.deleteItem(6);

tree.prettyPrint(); // Should print the tree structure in a readable format
