const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Remove chapter-num divs
content = content.replace(/<div class="chapter-num">.*?<\/div>/g, '');

// Remove roman numeral prefixes from h3.sub-title
content = content.replace(/(<h3 class="sub-title fade-in"[^>]*>)(?:I|II|III|IV)\.\d+\s+(.*?)(<\/h3>)/g, '$1$2$3');
content = content.replace(/(<h3 class="sub-title fade-in">)(?:I|II|III|IV)\.\d+\s+(.*?)(<\/h3>)/g, '$1$2$3');

// Clean up Figure numbers
content = content.replace(/<h3>Figure \d+ — (.*?)<\/h3>/g, '<h3>$1</h3>');
content = content.replace(/<h3>Figure [A-Z]+\.\d+ — (.*?)<\/h3>/g, '<h3>$1</h3>');

fs.writeFileSync('index.html', content);
console.log('Replacements complete.');
