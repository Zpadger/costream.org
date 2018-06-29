/**
  * Shuffles array in place.
  * @param {Array} a items The array containing the items.
  */
function shuffle (a) {
	a = a.concat([])
	if (window.location.hostname === 'localhost') {
		return a
	}
	var j, x, i
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i)
		x = a[i - 1]
		a[i - 1] = a[j]
		a[j] = x
	}
	return a
}

var team = [{
	name: 'Junqing Yu',
	title: 'Professor of DML',
	city: 'Wuhan, China',
	languages: ['zh', 'en'],
	github: null,
	img: '/images/YuJunqing.jpg',
	work: {
		role: 'Professor',
		org: 'HUST DML'
	},
	reposOfficial: [
		'多核计算与流编译', '基于内容的视频分析','网络安全与大数据处理'
	],
	links: [
		'http://faculty.hust.edu.cn/yujunqing/en/index.htm'
	]
}]

team = team.concat(shuffle([ //shuffle 函数打乱了后续成员的顺序
	{
		name: 'Mingtao Chen',
		title: 'Member of DML',
		city: 'Wuhan, China',
		languages: ['zh', 'en'],
		github: 'lhcmt',
		twitter: null,
		work: {
			role: 'Master',
			org:'HUST DML'
		},
		reposOfficial: [
			'COStream GPU'
		],
		//      reposPersonal: [
		//        
		//      ],
		links: [
			'https://github.com/lhcmt'
		]
	},
	{
		name: 'Zhaoji Wang',
		title: 'Member of DML',
		city: 'Wuhan, China',
		languages: ['zh', 'en'],
		github: 'PixelWang',
		twitter: null,
		work: {
			role: 'Master',
			org:'HUST DML'
		},
		reposOfficial: [
			'COStream Benchmark'
		],
		//      reposPersonal: [
		//        
		//      ],
		links: [
			'https://github.com/PixelWang'
		]
	},
	{
		name: 'Pingran Li',
		title: 'Member of DML',
		city: 'Wuhan, China',
		languages: ['zh', 'en'],
		github: 'blendTree',
		twitter: null,
		work: {
			role: 'Master',
			org:'HUST DML'
		},
		reposOfficial: [
			'COStream Dynamic scheduling'
		],
		//      reposPersonal: [
		//        
		//      ],
		links: [
			'https://github.com/blendTree'
		]
	},
	{
		name: 'Xinxing Li',
		title: 'Member of DML',
		city: 'Wuhan, China',
		languages: ['zh', 'en','jp'],
		github: 'lxx2013',
		twitter: null,
		work: {
			role: 'Master',
			org:'HUST DML'
		},
		reposOfficial: [
			'COStream - Graphic', 'Web'
		],
		//      reposPersonal: [
		//        
		//      ],
		links: [
			'http://setsuna.wang'
		]
	},
	{
		name: 'Fei Yang',
		title: 'Member of DML',
		city: 'Wuhan, China',
		languages: ['zh', 'en'],
		github: 'innocanca',
		twitter: null,
		work: {
			role: 'Master',
			org:'HUST DML'
		},
		reposOfficial: [
			'COStream - JPEG'
		],
		//      reposPersonal: [
		//        
		//      ],
		links: [
			'https://github.com/innocanca'
		]
	},
	{
		name: 'Bingqing Yu',
		title: 'Member of DML',
		city: 'Wuhan, China',
		languages: ['zh', 'en'],
		github: 'yu583497794',
		twitter: null,
		work: {
			role: 'Master',
			org:'HUST DML'
		},
		reposOfficial: [
			'COStream - Tensorflow'
		],
		//      reposPersonal: [
		//        
		//      ],
		links: [
			'https://github.com/yu583497794'
		]
	},
	{
		name: 'Hao Peng',
		title: 'Member of DML',
		city: 'Wuhan, China',
		languages: ['zh', 'en'],
		github: 'PHaoGhost',
		twitter: null,
		work: {
			role: 'Master',
			org:'HUST DML'
		},
		reposOfficial: [
			'COStream','Linux'
		],
		//      reposPersonal: [
		//        
		//      ],
		links: [
			'https://github.com/PHaoGhost'
		]
	}
]))

