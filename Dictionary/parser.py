letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
cur = 0

word_file = open('20k.txt', 'r')
words = word_file.readlines()
cur_file = open('a.txt', 'w')

for word in words:
	if (len(word) == 1 and (word != "a" or word !="i")) or (not 'a' in word and not 'e' in word and not 'i' in word and not 'o' in word and 'u' not in word and not 'y' in word):
		continue; 
	first_letter = word[:1]
	index = letters.index(first_letter)
	print(first_letter + " : " + str(index))
	if index >= 0:
		print("word: " + word)
		new_filename = letters[index] + '.txt'
		cur_file = open(new_filename, 'a')
		cur_file.write(word)

