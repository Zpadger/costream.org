/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
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
		'Multi-core Computing and Data-flow Compilation', 'Content-based Video Analytics', 'Network Security and Big Data Processing'
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
      org: 'HUST DML'
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
      org: 'HUST DML'
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
      org: 'HUST DML'
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
    languages: ['zh', 'en', 'jp'],
    github: 'lxx2013',
    twitter: null,
    work: {
      role: 'Master',
      org: 'HUST DML'
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
      org: 'HUST DML'
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
      org: 'HUST DML'
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
      org: 'HUST DML'
    },
    reposOfficial: [
			'COStream', 'Linux'
		],
    //      reposPersonal: [
    //
    //      ],
    links: [
			'https://github.com/PHaoGhost'
		]
    },
  {
    name: 'Zhen Chen',
    title: 'Master of DML',
    city: 'Shenzhen, China',
    languages: ['zh', 'en'],
    github: null,
    img: '/images/Chenzhen.jpg',
    work: {
      role: 'Master',
      org: 'HUST DML'
    },
    reposOfficial: [
      'COStream - HEVC'
    ]
  },
  {
    name: 'Bingsheng Mo',
    title: 'Member of DML',
    city: 'Hangzhou, China',
    languages: ['zh', 'en'],
    github: 'mobinsheng',
    twitter: null,
    work: {
      role: 'Master',
      org: 'HUST DML'
    },
    reposOfficial: [
      'COStream - H265'
    ],
    reposPersonal: [
      'HEVC', 'vs-x264-project'
    ],
    links: [
      'https://github.com/mobinsheng'
    ]
  },
  {
    name: 'Yuzhao Wang',
    title: 'Member of DML',
    city: 'Wuhan, China',
    languages: ['zh', 'en'],
    github: 'xingzheziran',
    twitter: null,
    work: {
      role: 'PhD',
      org: 'HUST DML'
    },
    reposOfficial: [
      'COStream Cloud version'
    ],
    // 	      	reposPersonal: [
    // 			'HEVC','vs-x264-project'
    // 	      	],
    links: [
      'https://github.com/xingzheziran'
    ]
  },
  {
    name: 'Ruirui Yang',
    title: 'Master of DML',
    city: 'Beijing, China',
    languages: ['zh', 'en'],
    github: null,
    img: 'https://i.loli.net/2018/07/05/5b3dac2fcafc4.png',
    work: {
      role: 'Master',
      org: 'HUST DML'
    },
    reposOfficial: [
      'COStream - CPU/GPU异构集群'
    ]
  },
  {
    name: 'Shengzhe Yang',
    title: 'Master of DML',
    city: 'Guangzhou, China',
    languages: ['zh', 'en'],
    github: null,
    img: 'https://i.loli.net/2018/07/08/5b41bbd7459ff.jpg',
    work: {
      role: 'Master',
      org: 'HUST DML'
    },
    reposOfficial: [
      'COStream - Dynamic Scheduling'
    ]
  },
  {
    name: 'Yan Yang',
    title: 'Master of DML',
    city: 'Beijing, China',
    languages: ['zh', 'en'],
    github: null,
    img: 'https://i.loli.net/2018/07/08/5b422ec5b0f42.png',
    work: {
      role: 'Master',
      org: 'HUST DML'
    },
    reposOfficial: [
      'COStream - Eclipse Plugin'
    ]
  },
  {
    name: 'Liang Zhu',
    title: 'Member of DML',
    city: 'Wuhan, China',
    languages: ['zh', 'en'],
    github: 'xingzhexiaozhu',
    twitter: null,
    work: {
      role: 'Master',
      org: 'HUST DML'
    },
    reposOfficial: [
      'COStream - Big Data'
    ],
    reposPersonal: [
      'DASCAN', 'MovieRecommendation'
    ],
    links: [
      'https://github.com/xingzhexiaozhu'
    ]
  },
  {
    name: 'Yexing Huang',
    title: 'Member of DML',
    city: 'Wuhan, China',
    languages: ['zh', 'en'],
    github: 'zzNire',
    twitter: null,
    work: {
      role: 'Master',
      org: 'HUST DML'
    },
    reposOfficial: [
      'COStream'
    ],
    reposPersonal: [
      'HTML-MusicPlayer'
    ],
    links: [
      'https://github.com/zzNire'
    ]
  },
]))
