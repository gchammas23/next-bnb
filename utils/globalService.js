import randomstring from "randomstring";

const generateString = (length) => {
    return randomstring.generate(length);
};

module.exports = {
    generateString
}