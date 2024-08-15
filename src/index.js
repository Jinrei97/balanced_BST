class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.sorted = this.mergeSort(arr);
    this.root = this.buildTree(this.sorted);
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

  buildTree = (arr) => {
    console.log(arr);
    let middle = Math.floor((arr.length - 1) / 2);
    let tree = null;

    if (arr.length === 1) {
      return new Node(arr[middle], null, null);
    } else if (arr.length === 0) {
      return new Node(null, null, null);
    } else {
      let left = this.buildTree(arr.slice(0, middle));
      let right = this.buildTree(arr.slice(middle + 1));
      console.log("left", left, "right", right);
      tree = new Node(arr[middle], left, right);
      return tree;
    }
  };
}

const arr = [2, 3, 1, 7, 6, 4, 5, 0, 10, 15, 26, 1];
const test = new Tree(arr);
console.log(test);
