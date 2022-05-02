const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = this.rootNode;
    if (node === null) {
      this.rootNode = new Node(data);
      return;
    } else {
      const placementTree = (node) => {
        if (data > node.data) {
          if(node.right === null) {
            node.right = new Node(data);
            return;
          } else if (node.right !== null) {
            return placementTree(node.right);
          }
        } else if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else if (node.left !== null) {
            return placementTree(node.left);
          }
        } else {
          return null;
        }
      }
      return placementTree(node);
    }
  }

  has(data) {
    let isHas = this.rootNode;
    while(isHas) {
      if (data === isHas.data) {
        return true;
      }
      if (data > isHas.data) {
        isHas = isHas.right;
      } else {
        isHas = isHas.left;
      }
    }
    return false;
  }

  find(data) {
    let findData = this.rootNode;
    while(data !== findData.data ) {
      if (data > findData.data) {
        findData = findData.right;
      } else {
        findData = findData.left
      }
      if (findData === null) {
        return null;
      }
    }
    return findData
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) {
        return null;
      }
      if (data === node.data) {
        if (node.left === null && node.right === null) {
          return null;
        }
        if (node.left === null) {
          return node.right;
        }
        if (node.right === null) {
          return node.left;
        }
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        node.left = removeNode(node.left, data);
        return node;
      }
    }
    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    let minData = this.rootNode;
    while( minData.left !== null) {
      minData = minData.left;
    }
    return minData.data;
  }

  max() {
    let maxData = this.rootNode;
    while( maxData.right !== null) {
      maxData = maxData.right;
    }
    return maxData.data;
  }
}

module.exports = {
  BinarySearchTree
};