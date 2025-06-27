// Mock for @/lib/utils
module.exports = {
  cn: (...inputs) => {
    return inputs.filter(Boolean).join(' ');
  }
};
