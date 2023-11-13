import json

def search(query):
    search_result= {"results":["Result 1", "Result 2", "Result 3"]}
    return json.dumps(search_result)

if __name__ == "__main__":
    query = "Your search query"
    result = search(query)
    print(result)
