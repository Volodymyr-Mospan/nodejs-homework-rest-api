function extractFieldNameFromErrorMessage(errorMessage) {
  const fieldName = errorMessage.slice(
    errorMessage.indexOf('"') + 1,
    errorMessage.lastIndexOf('"')
  );

  return fieldName;
}

module.exports = extractFieldNameFromErrorMessage;
