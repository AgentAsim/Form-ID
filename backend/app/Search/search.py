class SimpleSearchIndex:
    def __init__(self):
        self.searchTitles = []
        self.index = {}


    def add_to_index(self, titles, row):
        """Add a row to our search index"""
        for title in titles:
            if type(title) is not int or float:
                words = row[title].lower().split()
            else:
                words = row[title].split()
            for word in words:
                if word not in self.index:
                    self.index[word] = []
                self.index[word].append(row)

    def search(self, query):
        """Search using Index"""
        word = query.lower()
        return self.index.get(word)
