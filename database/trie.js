function Node(data) {
    this.data = data;
    this.isWord = false;
    this.prefixes = 0;
    this.children = {};
}

function Trie() {
    this.root = new Node('');
}

Trie.prototype.add = function(word) {
    if(!this.root) {
        return null;
    }
    this._addNode(this.root, word);
};
Trie.prototype._addNode = function(node, word) {
    if(!node || !word) {
        return null;
    }
    node.prefixes++;
    var letter = word.charAt(0);
    var child = node.children[letter];
    if(!child) {
        child = new Node(letter);
        node.children[letter] = child;
    }
    var remainder = word.substring(1);
    if(!remainder) {
        child.isWord = true;
    }
    this._addNode(child, remainder);
};

Trie.prototype.remove = function(word) {
    if(!this.root) {
        return;
    }
    if(this.contains(word)) {
        this._removeNode(this.root, word);
    }
};
Trie.prototype._removeNode = function(node, word) {
    if(!node || !word) {
        return;
    }
    node.prefixes--;
    var letter = word.charAt(0);

    var child = node.children[letter];
    if(child) {
        var remainder = word.substring(1);
        if(remainder) {
            if(child.prefixes === 1) {
                delete node.children[letter];
            } else {
                this._removeNode(child, remainder);
            }
        } else {
            if(child.prefixes === 0) {
                delete node.children[letter];
            } else {
                child.isWord = false;
            }
        }
    }
};

Trie.prototype.searchdec = function(word) {
    var reach=this.contains(word);
    if(reach) {
        var gotdecs = this.getWords(reach);
        for (i = 0; i < gotdecs.length; i++) {
            gotdecs[i]=word+gotdecs[i];
        }
        if(reach.isWord)gotdecs.unshift(word);
        return gotdecs;
    }
    else {
        console.log("there is no dec words");
    }
};
Trie.prototype.contains = function(word) {
    if(!this.root) {
        return false;
    }

    return this._contains(this.root, word);
};
Trie.prototype._contains = function(node, word) {
    if(!node || !word) {
        return false;
    }
    var letter = word.charAt(0);
    var child = node.children[letter];
    if(child) {
        var remainder = word.substring(1);
        if(!remainder) {
            return child;
        } else {
            return this._contains(child, remainder);
        }
    } else {
        return false;
    }
};
Trie.prototype.getWords = function(node) {
    var words = [];
    var word = '';
    this._getWords(node, words, words, word);
    return words;
};
Trie.prototype._getWords = function(node, words, word) {
    for(var child in node.children) {
        if(node.children.hasOwnProperty(child)) {
            word += child;
            if (node.children[child].isWord) {
                words.push(word);
            }
            this._getWords(node.children[child], words, word);
            word = word.substring(0, word.length - 1);
        }
    }
};
var trie = new Trie();

module.exports = trie;