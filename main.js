import { Tree } from "./tree.js";
// import { Node } from "./node.js";

const arr = [1, 2, 3, 4, 5, 6, 7];
const tree = new Tree(arr);

tree.prettyPrint();
tree.insert(8);
tree.prettyPrint();
tree.deleteItem(8);
// console.log("Is tree balanced?", tree.isBalanced());

// console.log("Level Order:");
// tree.levelOrderForEach((node) => console.log(node.data));

// console.log("Pre Order:");
// tree.preOrderForEach((node) => console.log(node.data));

// console.log("In Order:");
// tree.inOrderForEach((node) => console.log(node.data));

// console.log("Post Order:");
// tree.postOrderForEach((node) => console.log(node.data));

// // שלב 4: הוספת ערכים גדולים כדי לשבור איזון
// tree.insert(120);
// tree.insert(150);
// tree.insert(130);
// tree.insert(110);

// console.log("Tree after unbalancing:");
// tree.prettyPrint();

// // שלב 5: בדיקה שהעץ לא מאוזן
// console.log("Is tree balanced after inserts?", tree.isBalanced());

// // שלב 6: איזון מחדש
// tree.rebalance();

// console.log("Tree after rebalancing:");
// tree.prettyPrint();
// console.log("Is tree balanced now?", tree.isBalanced());
