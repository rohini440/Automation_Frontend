/**
 * Formats a Date object or ISO date string into a clean, human-readable format.
 * @param {Date|string} dateInput - The date to format
 * @param {boolean} includeTime - Whether to include hours and minutes
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateInput, includeTime = false) => {
  if (!dateInput) return 'N/A';
  
  const date = new Date(dateInput);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default formatDate;
