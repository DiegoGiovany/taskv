/*
 Navicat Premium Data Transfer

 Source Server         : mongo-local
 Source Server Type    : MongoDB
 Source Server Version : 50008
 Source Host           : localhost:27017
 Source Schema         : todo

 Target Server Type    : MongoDB
 Target Server Version : 50008
 File Encoding         : 65001

 Date: 22/05/2022 22:03:38
*/


// ----------------------------
// Collection structure for logs
// ----------------------------
db.getCollection("logs").drop();
db.createCollection("logs");

// ----------------------------
// Collection structure for projects
// ----------------------------
db.getCollection("projects").drop();
db.createCollection("projects");

// ----------------------------
// Collection structure for tasks
// ----------------------------
db.getCollection("tasks").drop();
db.createCollection("tasks");

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");
db.getCollection("users").createIndex({
    "$**": "text"
}, {
    name: "email",
    weights: {
        email: NumberInt("1")
    },
    "default_language": "english",
    "language_override": "language",
    textIndexVersion: NumberInt("3")
});
