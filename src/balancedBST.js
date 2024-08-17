export class Node {
  constructor(data, left, right, occurrences = 1) {
    this.data = data;
    this.occurrences = data ? occurrences : null;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  constructor(arr) {
    this.arr = arr;
    this.sorted = this.mergeSort(arr);
    this.sortedOccurrences = this.getOccurrences(this.sorted);

    console.log(this.sortedOccurrences);
    this.root = this.buildTree(this.sortedOccurrences);
    console.log(this.root);
    this.prettyPrint(this.root);
  }
  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  mergeSort = (arr) => {
    let sorted = [];
    if (arr.length === 1) {
      return [arr[0]];
    } else {
      const left = this.mergeSort(arr.slice(0, Math.floor(arr.length / 2)));
      const right = this.mergeSort(arr.slice(Math.floor(arr.length / 2)));
      sorted = this.mergeSortMergeHalves(left, right);
      return sorted;
    }
  };
  mergeSortMergeHalves = (left, right) => {
    let sorted = [];
    let i = 0;
    while (i < 20 && (left.length > 0 || right.length > 0)) {
      if (left.length > 0 && right.length > 0) {
        sorted.push(left[0] < right[0] ? left.shift() : right.shift());
      } else if (left.length === 0) {
        sorted.push(right.shift());
      } else {
        sorted.push(left.shift());
      }
      i += 1;
    }
    return sorted;
  };

  // note: this uses the array with the number of duplicates
  // it's an array of arrays
  buildTree = (arr) => {
    let middle = Math.floor((arr.length - 1) / 2);
    let tree = null;

    if (arr.length === 1) {
      return new Node(arr[middle][0], null, null, arr[middle][1]);
    } else if (arr.length === 0) {
      return null;
    } else {
      //console.log("inner array:", arr[middle]);
      let [middleValue, occurrences] = arr[middle];
      let left = this.buildTree(arr.slice(0, middle));
      let right = this.buildTree(arr.slice(middle + 1));
      //console.log("left", left, "right", right);
      tree = new Node(middleValue, left, right, occurrences);
      return tree;
    }
  };
  getOccurrences = (arr) => {
    let result = [];
    let occurrences = 0;
    for (let i = 0; i < arr.length; i++) {
      occurrences = 1;
      while (arr[i] === arr[i + 1]) {
        occurrences += 1;
        i += 1;
      }
      result.push([arr[i], occurrences]);
    }
    return result;
  };

  insert = (value) => {
    let subtree = this.root;
    let directions = [];
    while (subtree) {
      console.log("subtree: ", subtree);
      if (subtree.data === value) {
        subtree.occurrences += 1;
        return;
      } else if (subtree.data > value) {
        subtree = subtree.left;
        directions.push("left");
      } else if (subtree.data < value) {
        subtree = subtree.right;
        directions.push("right");
      }
    }
    subtree = this.root;
    directions.forEach((dir) => {
      if (!subtree[dir]) {
        subtree[dir] = new Node(value, null, null);
        return;
      } else {
        subtree = subtree[dir];
      }
    });
  };

  swapNodes = (tree, prev) => {
    let tempData = tree.data;
    let tempOcc = tree.occurrences;
    tree.data = prev.data;
    tree.occurrences = prev.occurrences;
    prev.data = tempData;
    prev.occurrences = tempOcc;
  };

  findInorderNode = (tree) => {
    let prev = tree;
    let right = tree.right;
    while (right) {
      right = right.right;
      prev = prev.right;
    }
    return prev;
  };

  deleteItem = (value, tree = this.root, prev = tree) => {
    console.log("prev: ", prev);
    console.log("tree: ", tree);

    if (!tree) {
      alert("value doesn't exist");
    }
    if (value === tree.data) {
      if (!tree.left && !tree.right) {
        if (prev.left === tree) {
          prev.left = null;
        } else {
          prev.right = null;
        }
      } else if ((tree.left && !tree.right) || (!tree.left && tree.right)) {
        let child = tree.left ? tree.left : tree.right;
        this.swapNodes(tree, child);
        this.prettyPrint(prev);
        this.deleteItem(child.data, child, tree);
      } else {
        let left = tree.left;
        console.log("left: ", left);
        if (left.right) {
          const inorderNode = this.findInorderNode(tree.left);
          console.log("INDORDER: ", inorderNode);
          this.swapNodes(tree, inorderNode);
          this.prettyPrint(prev);
          this.deleteItem(value, left, tree);
        } else {
          this.swapNodes(tree, left);
          this.prettyPrint(prev);
          this.deleteItem(left.data, left, tree);
        }
      }
    } else if (value < tree.data) {
      this.deleteItem(value, tree.left, tree);
    } else {
      this.deleteItem(value, tree.right, tree);
    }
  };

  find = (value) => {
    let current = this.root;
    while (current && current.data !== value) {
      current = current.data > value ? current.left : current.right;
    }
    return current;
  };

  // traversals
  levelOrderTraversal = (callback, tree = this.root) => {
    if (!callback) {
      console.log("No callback provided");
      return;
    }
    const queue = [];
    const f = (node) => {
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    };
    let current = tree;
    f(current);
    while (queue.length > 0) {
      current = queue.shift();
      f(current);
    }
    return current;
  };
  levelOrderTraversalRecursive = (
    callback,
    current = this.root,
    queue = []
  ) => {
    if (!callback) {
      console.log("No callback provided");
      return;
    }
    callback(current);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
    if (current !== this.root) {
      return queue;
    } else {
      while (queue.length > 0) {
        this.levelOrderTraversalRecursive(callback, queue.shift()).forEach(
          (node) => {
            queue.push(node);
          }
        );
      }
    }
  };

  // depth first:
  preorderTraversal = (callback) => {
    if (!callback) {
      console.log("No callback provided");
      return;
    }
    const f = (node) => {
      console.log(node);
      callback(node);
      if (node.left) f(node.left);
      if (node.right) f(node.right);
    };
    f(this.root);
  };
  inorderTraversal = (callback) => {
    if (!callback) {
      console.log("No callback provided");
      return;
    }
    const f = (node) => {
      if (node.left) f(node.left);
      console.log(node);
      callback(node);
      if (node.right) f(node.right);
    };
    f(this.root);
  };
  postorderTraversal = (callback) => {
    if (!callback) {
      console.log("No callback provided");
      return;
    }
    const f = (node) => {
      if (node.left) f(node.left);
      if (node.right) f(node.right);
      console.log(node);
      callback(node);
    };
    f(this.root);
  };

  height = (node) => {
    if (!node || !this.find(node.data)) {
      return "The node doesn't exist";
      // throw new Error("The node doesn't exist");
    }
    let current = node;
    const farthestLeaf = this.levelOrderTraversal((n) => {}, current);
    return this.depth(farthestLeaf) - this.depth(current);
  };

  depth = (node) => {
    if (!node || !this.find(node.data)) {
      return "The node doesn't exist";
      // throw new Error("The node doesn't exist");
    }
    let current = this.root;
    let h = 0;
    while (current !== node) {
      h += 1;
      if (current.data > node.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return h;
  };

  isBalanced = (node = this.root) => {
    const f = (node) => {
      if (node) {
        let left = node.left ? this.height(node.left) : 0;
        let right = node.right ? this.height(node.right) : 0;
        return Math.abs(left - right) <= 1;
      } else {
        return true;
      }
    };
    const result = f(node);
    //console.log("node: ", node, "balanced Node: ", result);
    if (result) {
      let condition = null;
      if (!node.left && !node.right) {
        //console.log("LEAF");
        condition = true;
      } else if (node.left && !node.right) {
        //console.log("LEFT");
        condition = this.isBalanced(node.left);
      } else if (!node.left && node.right) {
        //console.log("RIGHT");
        condition = this.isBalanced(node.right);
      } else {
        //console.log("BOTH");
        condition = this.isBalanced(node.left) && this.isBalanced(node.right);
      }
      //console.log("test result: ", condition, "\nnode: ", node);
      return condition;
    } else {
      return false;
    }
  };
}
