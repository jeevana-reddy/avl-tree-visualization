# avl-tree-visualization
AVL Tree Visualization — An interactive web-based visualization of AVL Tree operations including insertion, deletion, automatic rotations, and balancing using HTML, CSS, and JavaScript.

🔗 Live Demo:
https://jeevana-reddy.github.io/avl-tree-visualization/

# Overview

An AVL Tree is a self-balancing Binary Search Tree where the height difference between left and right subtrees is always at most 1.

This project provides a visual and interactive way to understand how AVL Trees maintain balance using rotations during insert and delete operations.

The visualization dynamically updates for every operation, clearly demonstrating:

Tree structure changes

Automatic rebalancing

Node repositioning after rotations

# Features

Interactive value input for tree operations

Insert, Delete, and Reset functionality

Real-time AVL tree updates

Automatic balancing using LL, RR, LR, and RL rotations

Animated node movement and edge transitions

Clear visualization of parent–child relationships

Clean, modern, and professional UI

Fully client-side (no libraries, pure JavaScript)

# How It Works

# 1) Insert(value)

Inserts a new node following Binary Search Tree rules

Updates height of affected nodes

Calculates balance factor

Automatically performs necessary rotations to maintain AVL balance

Animates node placement and rotations

# 2) Delete(value)

Removes the specified node from the tree

Handles all deletion cases:

Leaf node

Node with one child

Node with two children

Rebalances the tree after deletion

Smoothly removes the node from the visualization

# 3) Reset

Clears the entire tree

Removes all nodes and connections from the screen

Resets the AVL tree to its initial empty state

Understanding how self-balancing BSTs work

Interview preparation for Data Structures & Algorithms
