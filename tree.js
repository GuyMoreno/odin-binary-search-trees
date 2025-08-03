import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    const processedArray = this.cleanedArray(array);
    this.root = this.buildTree(processedArray);
  }

  cleanedArray(array) {
    // Remove duplicates
    const cleanedArray = [...new Set(array)];
    // Sort the array
    cleanedArray.sort((a, b) => a - b);
    return cleanedArray;
  }

  //  0  1  2  3  4  5  6
  // [1, 2, 3, 4, 5, 6, 7]
  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) {
      return null;
    }

    //          mid
    //  0  1  2  3  4  5  6
    // [1, 2, 3, 4, 5, 6, 7]

    const mid = Math.floor((start + end) / 2);
    // Create a new node with the middle element
    const node = new Node(array[mid]);
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);
    return node;
  }

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
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
      return node; 
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
      return node; 
    } else {

      if (node.left === null) {

        return node.right;
      } else if (node.right === null) {

        return node.left;
      }

      node.data = this.#findMin(node.right); 
      
      node.right = this.deleteItem(node.data, node.right);
      return node; 
    }
  }

  #findMin(node) {

    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
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

  find(value, node = this.root) {
    // Step 1: Base Case - Node not found or reached end of tree
    if (node === null) {
      return null;
    }

    // Step 2: Base Case - Node found!
    if (value === node.data) {
      return node; // Return the actual Node object
    }

    // Step 3: Traverse Left or Right
    if (value < node.data) {
      // If value is smaller, go left
      return this.find(value, node.left); // Return the result of the recursive call
    } else {
      // value > node.data
      // If value is larger, go right
      return this.find(value, node.right); // Return the result of the recursive call
    }
  }

  levelOrderForEach(callback) {
    // Check if a callback is provided
    if (typeof callback !== "function") {
      throw new Error(
        "levelOrderForEach requires a callback function as an argument."
      );
    }

    // Handle an empty tree
    if (this.root === null) {
      return; // Nothing to traverse
    }

    // Initialize the queue
    // Use a standard JavaScript array as a queue.
    // Add the root node to the queue to start the traversal.
    const queue = [this.root];

    // Step 4: Loop while the queue is not empty
    while (queue.length > 0) {
      // Step 4a: Dequeue the front node
      // Array.prototype.shift() removes the first element and returns it.
      const currentNode = queue.shift();

      // Step 4b: Process the current node
      // Call the provided callback function, passing the current node.
      callback(currentNode);

      // Step 4c: Enqueue children (if they exist)
      // Add left child first (to maintain level-order from left to right)
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      // Add right child next
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrderForEach(callback, node = this.root) {
    // 1. Safety Check: Ensure a callback function is provided.
    if (typeof callback !== "function") {
      throw new Error(
        "inOrderForEach requires a callback function as an argument."
      );
    }

    // 2. Base Case for Recursion: If the current node is null, stop.
    if (node === null) {
      return;
    }

    // 3. Go Left: Recursively process the left subtree.
    //    This call will run completely until it hits a null node,
    //    then it will return to this point.
    this.inOrderForEach(callback, node.left);

    // 4. Process the Current Node: Once the left subtree is fully processed,
    //    execute the callback on the current node.
    callback(node);

    // 5. Go Right: Recursively process the right subtree.
    //    This call will run completely, and then the current function call ends.
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    // Step 1: Safety Check (not relevant to flow, but always first)
    if (typeof callback !== "function") {
      throw new Error(
        "preOrderForEach requires a callback function as an argument."
      );
    }

    // Step 2: Base Case (the 'stop' instruction)

    if (node === null) {
      return; // This mini-program for 'null' node is done. Go back to whoever called me.
    }

    // Step 3: Do something with ME (the current node)
    callback(node);

    // Step 4: COMPLETELY process my LEFT child's recipe
    this.preOrderForEach(callback, node.left); // Call another mini-program

    // Step 5: COMPLETELY process my RIGHT child's recipe
    this.preOrderForEach(callback, node.right); // Call another mini-program

    // (End of this mini-program's recipe)
    // When all steps are done, this mini-program for 'node' is finished.
    // It automatically 'returns' to whoever called it, just like Step 2.
  }

  postOrderForEach(callback, node = this.root) {
    // 1. Safety Check
    if (typeof callback !== "function") {
      throw new Error(
        "postOrderForEach requires a callback function as an argument."
      );
    }

    // 2. Base Case for Recursion
    if (node === null) {
      return;
    }

    // 3. Go Left: Recursively process the left subtree.
    this.postOrderForEach(callback, node.left);

    // 4. Go Right: Recursively process the right subtree.
    this.postOrderForEach(callback, node.right);

    // 5. Process the Current Node (Root): This happens LAST!
    //    Only after both the left and right subtrees have been fully processed.
    callback(node); // <-- This is the final action for this node!
  }

  height(value) {
    // 1. Find the node with the given value.
    const startNode = this.find(value);

    // 2. Handle the case where the value is not found in the tree.
    if (startNode === null) {
      return null; // As per assignment: "If the value is not found in the tree, the function should return null."
    }

    // 3. If the node is found, call our private recursive helper
    //    to calculate its height.
    return this.#calculateNodeHeight(startNode);
  }

  // Remember to place the #calculateNodeHeight helper method above or below this one in your class:
  #calculateNodeHeight(node) {
    if (node === null) {
      return -1;
    }
    const leftHeight = this.#calculateNodeHeight(node.left);
    const rightHeight = this.#calculateNodeHeight(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(value) {
    // 1. Start at the root and initialize depth count to 0.
    let currentNode = this.root;
    let depth = 0;

    // 2. Loop until we find the value or fall off the tree.
    while (currentNode !== null) {
      // 3. If we find the value, return the current depth.
      if (value === currentNode.data) {
        return depth;
      }

      // 4. If the value is not found, decide where to go next.
      if (value < currentNode.data) {
        currentNode = currentNode.left; // Go left
      } else {
        currentNode = currentNode.right; // Go right
      }

      // 5. Increment depth for each level we descend.
      depth++;
    }

    // 6. If the loop finishes, the value was not found.
    return null;
  }

  isBalanced(node = this.root) {
    // Base Case: A null node is considered balanced.
    if (node === null) {
      return true;
    }

    // 1. Get the height of the left and right subtrees
    //    We can reuse the helper from our `height(value)` function!
    const leftHeight = this.#calculateNodeHeight(node.left);
    const rightHeight = this.#calculateNodeHeight(node.right);

    // 2. Check if the current node is balanced
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false; // Found an unbalanced node!
    }

    // 3. If this node is okay, recursively check that BOTH children are also balanced
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((node) => values.push(node.data));
    this.root = this.buildTree(values); // בונה מחדש עץ מאוזן
  }
}
