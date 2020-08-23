tags = "";
total = 0;

kw = ['arse','ass','ass fuck','asshole','assfucker','asshole','Taboo','stranger ','cyberfuck','brunette','Hardcore','blowjob','milf','sex','bigboob','boobs','blondegirl','sexyteen','sexyteens','musterbating','musterbation','assshole','bastard','bitch','black cock','cock','cockfucker','cocksuck','cocksucker','coonnass','crap','cunt','dick','dirty','douche','dummy','erect','erection','erotic','escort','faggot','fuck','Fuckoff','fuck you','fuckass','fuckhole','hard core','hardcore','homoerotic','lesbian','lesbians','motherfucker','motherfuck','motherfucker','nigger','orgasim','orgasm','penis','penisfucker','piss','piss off','porn','pornography','pussy','sex','sexy','slut','suck','tits','anal sex','xxx','condom','BigAss','Sex','LatinMILF','MILF','Holes','Blonde','Seduced','Busty','hot','busty']
for(var ii = 0; ii < kw.length; ii++)
{
	o = $(`:contains(${kw[ii]}):not(:has(:contains(${kw[ii]})))`)
	for(var i = 0; i < o.length; i++)
	{
		if (!o[i].parentNode || o[i].parentNode.nodeName === "BODY") {
          continue;
        }
		hideSpoiler(o[i]);
		total++;
	}
}

if(total >= 10) {
	headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
	for(var i = 0; i < headings.length; i++) hideNode(headings[i]);
}

function hideSpoiler(node) {
	ancestor = node.parentNode;
	if(ancestor != null) {
		if (ancestor.parentNode != null 
				&& ancestor.tagName != 'BODY')
				ancestor = ancestor.parentNode;	
		imgs = ancestor.getElementsByTagName('img');
		for(var i = 0; i < imgs.length; i++) 
			imgs[i].style.webkitFilter = "blur(90px)"
		lists = ancestor.getElementsByTagName('li');
		for(var i = 0; i < lists.length; i++) hideNode(lists[i]);
	}

	if (node == null || node.parentNode == null) return;
	all_child = node.parentNode.children;
	for(var i = 0; i < all_child; i++) {
		var type = all_child[i].tagName;
		if (tags.match(type) != null) hideNode(all_child[i]);
	}
	hideNode(node);
}

function hideNode(node) {
	node.textContent = '[Text Blocked : Offensive content warning.]';
	node.style.color = 'red'
}
