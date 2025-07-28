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
}
