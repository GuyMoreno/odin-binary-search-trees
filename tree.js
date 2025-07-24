import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    const processedArray = this.cleanedArray(array);
    this.root = this.buildTree(processedArray);
  }

  cleanedArray(array) {
    const cleanedArray = [...new Set(array)];
    cleanedArray.sort((a, b) => a - b);
    return cleanedArray;
  }

  //  0  1  2  3  4  5  6
  // [1, 2, 3, 4, 5, 6, 7]
  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }
    //  0  1  2  3  4  5  6
    // [1, 2, 3, 4, 5, 6, 7]

    const mid = Math.floor((start + end) / 2);

    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);

    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  // --- NEW INSERT METHOD ---
  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value); // Found the spot, create and return new node
    }

    if (value === node.data) {
      return node; // Duplicate, do nothing and return current node
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left); // Go left
    } else {
      // value > node.data
      node.right = this.insert(value, node.right); // Go right
    }

    return node; // Return the node (or its updated children)
  }
  // --- END NEW INSERT METHOD ---

  deleteItem(value, node = this.root) {
    // Step 1: Base Case - If the tree is empty or value not found
    if (node === null) {
      return null; // Value not found, or empty subtree
    }

    // Step 2: Traverse to find the node to delete
    if (value < node.data) {
      // If value is smaller, go left
      node.left = this.deleteItem(value, node.left);
      return node; // Return current node (with potentially updated left child)
    } else if (value > node.data) {
      // If value is larger, go right
      node.right = this.deleteItem(value, node.right);
      return node; // Return current node (with potentially updated right child)
    } else {
      // Step 3: Node with the 'value' is found (value === node.data)

      // Case 1: Node has no children (Leaf Node) OR Node has one child
      if (node.left === null) {
        // If no left child, return the right child (which could be null)
        return node.right;
      } else if (node.right === null) {
        // If no right child, return the left child
        return node.left;
      }

      // Case 2: Node has two children
      // Find the in-order successor (smallest node in the right subtree)
      node.data = this.#findMin(node.right); // Replace current node's data with successor's data
      // Delete the in-order successor from the right subtree
      node.right = this.deleteItem(node.data, node.right);
      return node; // Return the current node (with new data and updated right child)
    }
  }

  #findMin(node) {
    // Traverse left until the leftmost node is found
    while (node.left !== null) {
      node = node.left;
    }
    return node.data; // Return the data of the smallest node
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    // 1. Base case: If the node is null, stop.
    if (node === null) {
      return;
    }

    // 2. Recursively print the right child (with updated prefix and direction)
    //    Notice 'this.prettyPrint' here!
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    // 3. Print the current node's data
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    // 4. Recursively print the left child (with updated prefix and direction)
    //    Notice 'this.prettyPrint' here!
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}
