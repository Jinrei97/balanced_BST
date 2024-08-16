class Node {
  constructor(data, left, right, occurrences = 1) {
    this.data = data;
    this.occurrences = data ? occurrences : null;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.sorted = this.mergeSort(arr);
    this.sortedOccurrences = this.getOccurrences(this.sorted);

    console.log(this.sortedOccurrences);
    console.log(this.sortedOccurrences[0][0]);
    console.log(typeof this.sortedOccurrences[0][0]);

    this.root = this.buildTree(this.sortedOccurrences);
    this.prettyPrint(this.root);
    console.log(this.levelOrderTraversal());
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

  levelOrderTraversal = (tree = this.root) => {
    const order = [];

    order.push(tree);
    if (tree.left) order.push(this.levelOrderTraversal(tree.left));
    if (tree.right) order.push(this.levelOrderTraversal(tree.right));
    return order;
  };
  // note: this uses the array with the number of duplicates
  // it's an array of arrays
  buildTree = (arr) => {
    console.log(arr);
    let middle = Math.floor((arr.length - 1) / 2);
    let tree = null;

    if (arr.length === 1) {
      return new Node(arr[middle][0], null, null, arr[middle][1]);
    } else if (arr.length === 0) {
      return null;
    } else {
      console.log("inner array:", arr[middle]);
      let [middleValue, occurrences] = arr[middle];
      let left = this.buildTree(arr.slice(0, middle));
      let right = this.buildTree(arr.slice(middle + 1));
      console.log("left", left, "right", right);
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
        console.log("child:", child);
        this.swapNodes(tree, child);
        this.prettyPrint(prev);
        this.deleteItem(child.data, child, tree);
      } else {
        let left = tree.left;
        let right = tree.right;
        console.log("left: ", left);
        console.log("right: ", right);
        if (!(prev === tree)) {
          if (left.right) {
            const inorderNode = this.findInorderNode(tree.left);
            console.log("INORDER: ", inorderNode);
            this.swapNodes(tree, inorderNode);
            this.prettyPrint(prev);
            this.deleteItem(value, left, tree);
          } else {
            this.swapNodes(tree, left);
            this.prettyPrint(prev);
            this.deleteItem(left.data, left, tree);
          }
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
}

//const arr = [2, 3, 1, 7, 6, 4, 5, 0, 10, 15, 26, 0];
const arr = [4, 15, 3, 8, 5, 15, 26, 7, 0, 9, 6, 4];
const test = new Tree(arr);
console.log(test);

test.insert(20);
test.insert(4);
test.prettyPrint(test.root);

const deleteArr = [
  20, 40, 50, 30, 60, 70, 80, 100, 80, 25, 40, 60, 80, 15, 55, 75, 26,
];
const deleteTest = new Tree(deleteArr);
console.log("\nDELETE TESTS:");
// delete leaf
console.log("leaf:");
deleteTest.deleteItem(20);
deleteTest.prettyPrint(deleteTest.root);
// delete with 2 children
console.log("2 children");
deleteTest.deleteItem(70);
deleteTest.prettyPrint(deleteTest.root);
// delete with 1 child
console.log("1 child");
deleteTest.deleteItem(60);
deleteTest.prettyPrint(deleteTest.root);
// delete root
console.log("root");
deleteTest.deleteItem(50);
deleteTest.prettyPrint(deleteTest.root);
