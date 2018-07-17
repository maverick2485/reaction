import fs from "fs";
import csv from "csv";

// This will contain all importable collections registered in different Reaction plugins
export const ImportableCollections = {};

/**
 * @summary TODO
 * @param {Object} impColl - TODO
 * @returns {undefined}
 * @private
 */
function validateImportableCollection(impColl) {
  if (typeof impColl.collection !== "string") {
    throw TypeError("An importable collection requires a collection.");
  }
  if (!impColl.importSchema || !impColl.importSchema.length || impColl.importSchema.length === 0) {
    throw TypeError("An importable collection requires an importSchema.");
  }
  impColl.importSchema.forEach((field) => {
    if (typeof field.key !== "string") {
      throw TypeError("Key is required for an importSchema field.");
    }
    if (typeof field.label !== "string") {
      throw TypeError("Label is required for an importSchema field.");
    }
    if (typeof field.saveToField !== "string") {
      throw TypeError("saveToField is required for an importSchema field.");
    }
  });
  return true;
}

/**
 * @summary TODO
 * @param {Object} impColl - TODO
 * @returns {boolean} TODO
 */
export function registerImportableCollection(impColl) {
  try {
    validateImportableCollection(impColl);
  } catch (error) {
    throw error;
  }
  ImportableCollections[impColl.collection] = impColl.importSchema;
  return true;
}

/**
 * @summary TODO
 * @param {Object} filePath - TODO
 * @param {Object} delimiter - TODO
 * @returns {Object} the callback
 * @private
 */
export function readCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .on("data", (data) => {
        csv.parse(data, (error, csvRows) => {
          if (error) {
            reject(error);
          }
          resolve(csvRows);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}