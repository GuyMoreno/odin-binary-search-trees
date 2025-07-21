// import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedUnique = [...new Set(array)].sort((a, b) => a - b);

    function buildSubTree(arr, left, right) {
      if (left > right) return null;

      const mid = Math.floor((left + right) / 2);
      const node = new Node(arr[mid]);

      node.left = buildSubTree(arr, left, mid - 1);
      node.right = buildSubTree(arr, mid + 1, right);

      return node;
    }

    return buildSubTree(sortedUnique, 0, sortedUnique.length - 1);
  }
}
