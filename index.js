const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const characters = require ("./characters.json");
let cheerio = require('cheerio');
let jsonframe = require('jsonframe-cheerio');

client.once('ready', () => {
    console.log('ready!')
})

//npx nodemon index.js
//rs [to restart nodemon index.js]

//ARRAY FOR CHAREXPLIST.
var characterExpList =  [
    0,
  1000,
  1325,
  1700,
  2150,
  2625,
  3150,
  3725,
  4350,
  5000,
  5700,
  6450,
  7225,
  8050,
  8925,
  9825,
  10750,
  11725,
  12725,
  13775,
  14875,
  16800,
  18000,
  19250,
  20550,
  21875,
  23250,
  24650,
  26100,
  27575,
  29100,
  30650,
  32250,
  33875,
  35550,
  37250,
  38975,
  40750,
  42575,
  44425,
  46300,
  50625,
  52700,
  54775,
  56900,
  59075,
  61275,
  63525,
  65800,
  68125,
  70475,
  76500,
  79050,
  81650,
  84275,
  86950,
  89650,
  92400,
  95175,
  98000,
  100875,
  108950,
  112050,
  115175,
  118325,
  121525,
  124775,
  128075,
  131400,
  134775,
  138175,
  148700,
  152375,
  156075,
  159825,
  163600,
  167425,
  171300,
  175225,
  179175,
  183175,
  216225,
  243025,
  273100,
  306800,
  344600,
  386950,
  434425,
  487625,
  547200
] //Array shown is similar to : "https://genshin-impact.fandom.com/wiki/Character_EXP"

client.on('message', message => {

    //Date
    var CurrentDate = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var Time = String
    var Today = CurrentDate.getDay();
    //EndDate

    //Commands
    if(message.content.startsWith(`${prefix}help`)) {

      const embed = new Discord.MessageEmbed()
      .setTitle("HELP - Command list")
      .setColor('#87ceff') 
      .setDescription('Here are the commands needed for this bot. Every commands starts with a dot (.)')
      .setThumbnail('https://cdn.discordapp.com/emojis/782407596778061835.png?v=1')
      .addFields(
        {
          name : "Help",
          value : "Shows you the command lists available",
          inline : true
      },
      {
        name : "Domain",
        value : "Shows you the current time and the server's current Domain available",
        inline : true
      },
      {
        name : "Day",
        value : "Shows you the current day",
        inline : true
      },
      {
        name : "Expcalc [Level]",
        value : "Shows you the amount needed for your character to advanced to the desired level from 0",
        inline : true
      },
      {
        name : "Info [Character's Name]",
        value : "Shows you a quick guide tip for the requested Character's Name",
        inline : true
      }
      )

      message.channel.send(embed);

    }

    if(message.content.startsWith(`${prefix}domain`)) {
        if (CurrentDate.getHours()<13) {
            Time = "AM"
        } else {
            Time = "PM"
        }

        //Domain
        message.channel.send("Today is " + CurrentDate.toDateString() + " ["+ CurrentDate.getHours() + Time + " GMT+8]. Here are the domain list available for today.")
        message.channel.send("============================ \ ")

        if (CurrentDate.getDay() === 1 ||CurrentDate.getDay() ===  4) {
            message.channel.send("[TALENT]: Talent Books of Prosperity | Talent Books of Freedom")
            message.channel.send("[WEAPONS]: Decarabian | Guyun")
        } else {
        
        if (CurrentDate.getDay() === 2 ||CurrentDate.getDay() ===  5) {
            message.channel.send("[TALENT]: Talent Books of Dilligence | Talent Books of Resistance")
            message.channel.send("[WEAPONS]: Mist Veiled Elixir | Boreal Wolf")
        } else {
    
        if (CurrentDate.getDay() === 3 || CurrentDate.getDay() === 6) {
            message.channel.send('[TALENT]: Talent Books of Gold | Talent Books of Ballad')
            message.channel.send('[WEAPONS]: Aerosiderite | Dandelion Gladiator')
        } else {

            if (CurrentDate.getDay()=== 0) {
                message.channel.send("ALL DOMAINS ARE AVAILABLE TODAY")
            }
        }
        }
        }
        message.channel.send("============================")
        message.channel.send("Please notice that **ALL DOMAINS WILL RESET** at 4:00 AM [GMT+8]")
    }   //EndDomain


        if (message.content.startsWith(`${prefix}day`)) {
            message.channel.send(days[CurrentDate.getDay()])
        }

        if (message.content.startsWith(`${prefix}expcalc`)) {

            const args = message.content.slice(prefix.length).trim().split(' ') ;
            const ExpLevel = args.shift().replace("expcalc", args)

            message.channel.send("ExpLevel: " + ExpLevel)

            function expcalc () {
   
                let totalExpNeeded = 0;
                let currentLevel = 0;

                    for (currentLevel = 0; currentLevel <= ExpLevel; currentLevel++ ) {
                        totalExpNeeded += characterExpList[currentLevel]
                 
                    }
                    return totalExpNeeded;   
            }

            var total, total1 = expcalc(ExpLevel);
            message.channel.send("Total needed: " + total1 + " EXP")


        } //EXPCalc end.

        //
        if (message.content.startsWith(`${prefix}info`)) {

            const args = message.content.slice(prefix.length).trim().split(' ') ;
            const CharName = args.shift().replace("info", args)


            const Hydro = 'https://static.wikia.nocookie.net/gensin-impact/images/3/35/Element_Hydro.png/revision/latest/scale-to-width-down/60?cb=20201116063105'
            const Pyro = 'https://static.wikia.nocookie.net/gensin-impact/images/e/e8/Element_Pyro.png/revision/latest/scale-to-width-down/60?cb=20201116063114'
            const Electro = 'https://static.wikia.nocookie.net/gensin-impact/images/7/73/Element_Electro.png/revision/latest/scale-to-width-down/60?cb=20201116063049'
            const Anemo = 'https://static.wikia.nocookie.net/gensin-impact/images/a/a4/Element_Anemo.png/revision/latest/scale-to-width-down/60?cb=20201116063017'
            const Cryo = 'https://static.wikia.nocookie.net/gensin-impact/images/8/88/Element_Cryo.png/revision/latest/scale-to-width-down/60?cb=20201116063123'
            const Geo = 'https://static.wikia.nocookie.net/gensin-impact/images/4/4a/Element_Geo.png/revision/latest/scale-to-width-down/60?cb=20201116063036'
            const Dendro = 'https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Element_Dendro.png/revision/latest/scale-to-width-down/60?cb=20201116063058'

            const BorderHydro = '0x0000ff'
            const BorderPyro = '0xFF0000'
            const BorderElectro = '0x800080'
            const BorderAnemo = '0x7FFF00'
            const BorderCryo = '0x00BFFF'
            const BorderGeo = '0xFFB005'
            const BorderDendro = '0x008000'
            
            const HydroChar = ['Barbara', 'Mona', 'Tartaglia', 'Xingqiu']
            const PyroChar = ['Amber', 'Bennet', 'Diluc', 'Klee', 'Xiangling', 'Xinyan']
            const ElectroChar = ['Beidou', 'Fischl', 'Keqing', 'Lisa', 'Razor']
            const AnemoChar = ['Jean', 'Sucrose', 'Venti', 'Xiao']
            const CryoChar = ['Chongyun', 'Diona', 'Ganyu', 'Kaeya', 'Qiqi']
            const GeoChar = ['Albedo', 'Ningguang', 'Noelle', 'Zhongli']
            const DendroChar = []
            
            const characters = [
                {
                  name: "Amber",
                  key: "amber",
                  page: "https://genshin.gg/characters/Amber",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/c24676965b33c9729e55d574317f4e4b_4650542935533675840.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Pyro,
                  border: BorderPyro,
                },
                {
                  name: "Barbara",
                  key: "barbara",
                  page: "https://genshin.gg/characters/Barbara",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/7cf06de305f0d3278d19c483a3c5e71c_8181223783107758209.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Hydro,
                  border: BorderHydro
                },
                {
                  name: "Beidou",
                  key: "beidou",
                  page: "https://genshin.gg/characters/Beidou",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/28d0ede287f0e11c2c544ee2cf6a8ff8_6684824394158036638.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Electro,
                  border: BorderElectro
                },
                {
                  name: "Bennett",
                  key: "bennett",
                  page: "https://genshin.gg/characters/Bennett",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/fd575d25423eacaf923964873698c2ae_2820728792887297795.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Pyro,
                  border: BorderPyro
                },
                {
                  name: "Chongyun",
                  key: "chongyun",
                  page: "https://genshin.gg/characters/Chongyun",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/b7a0659c08d68d01fc41feba198f5688_618143834039548393.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Cryo,
                  border: BorderCryo
                },
                {
                  name: "Diluc",
                  key: "diluc",
                  page: "https://genshin.gg/characters/Diluc",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/079e6b7934f6a28ae04bc23395522acb_2120190023230351817.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Pyro,
                  border: BorderPyro
                },
                {
                  name: "Fischl",
                  key: "fischl",
                  page: "https://genshin.gg/characters/Fischl",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/f94a70624a8e3a6cb0a4f68b0553d643_4956899075114003266.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Electro,
                  border: BorderElectro
                },
                {
                  name: "Jean",
                  key: "jean",
                  page: "https://genshin.gg/characters/Jean",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/f56e9f141ebcb267fdd7afb0b3da460b_265807761011636120.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Anemo,
                  border: BorderAnemo
                },
                {
                  name: "Kaeya",
                  key: "kaeya",
                  page: "https://genshin.gg/characters/Kaeya",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/cb8f09881377c1a19142ee8cb0ebba9d_2629840263141903187.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Cryo,
                  border: BorderCryo
                },
                {
                  name: "Keqing",
                  key: "keqing",
                  page: "https://genshin.gg/characters/Keqing",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/c56cb1c567df813edbdd87a4facffbe4_3042275931290060789.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Electro,
                  border: BorderElectro
                },
                {
                  name: "Klee",
                  key: "klee",
                  page: "https://genshin.gg/characters/Klee",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/9615d668ed5aabe4c31e264ff2288ba7_7463964342845568897.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Pyro,
                  border: BorderPyro,
                  description: ''
                },
                {
                  name: "Lisa",
                  key: "lisa",
                  page: "https://genshin.gg/characters/Lisa",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/6718b2955f0f126e717121ef971c382a_3092509028510414950.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Electro,
                  border: BorderElectro
                },
                {
                  name: "Mona",
                  key: "mona",
                  page: "https://genshin.gg/characters/Mona",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/6892db21c166ebb0608075cc3e231701_4919187778043825687.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Hydro,
                  border: BorderHydro
                },
                {
                  name: "Ningguang",
                  key: "ningguang",
                  page: "https://genshin.gg/characters/Ningguang",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/bad8b91922d635615de9785c4674ded1_6696492610911833397.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Geo,
                  border: BorderGeo
                },
                {
                  name: "Noelle",
                  key: "noelle",
                  page: "https://genshin.gg/characters/Noelle",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/072273bbf93c515c80238f74ca796220_889925071523275840.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Geo,
                  border: BorderGeo
                },
                {
                  name: "Qiqi",
                  key: "qiqi",
                  page: "https://genshin.gg/characters/Qiqi",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/049318593df47ca1c90ac51825f63582_6526923359065633894.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Cryo,
                  border: BorderCryo
                },
                {
                  name: "Razor",
                  key: "razor",
                  page: "https://genshin.gg/characters/Razor",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/26034e7eb14a93af1e466cb9914afa89_6549469093139628676.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Electro,
                  border: BorderElectro
                },
                {
                  name: "Sucrose",
                  key: "sucrose",
                  page: "https://genshin.gg/characters/Sucrose",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/c7adb9d56c183bf95d8e265ee98d9764_1707853565351011307.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Anemo,
                  border: BorderAnemo
                },
                {
                  name: "Traveler (Anemo)",
                  key: "traveleranemo",
                  page: "https://genshin.gg/characters/Traveler%28Anemo%29",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/16/63355475/17050194b5c4b0f6851452d2c919e307_6124276671027875612.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Anemo,
                  border: BorderAnemo
                },
                {
                  name: "Traveler (Geo)",
                  key: "travelergeo",
                  page: "https://genshin.gg/characters/Traveler%28Geo%29",
                  image: "",
                  elemental: Geo,
                  border: BorderGeo
                },
                {
                  name: "Venti",
                  key: "venti",
                  page: "https://genshin.gg/characters/Venti",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/63885b174a90abecb0d8b57b00ebef5c_6871088987868828867.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Anemo,
                  border: BorderAnemo
                },
                {
                  name: "Xiangling",
                  key: "xiangling",
                  page: "https://genshin.gg/characters/Xiangling",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/11/63355475/4b3bcc8f364b1097b9d2acd69f7e41e3_1943686907799161859.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Pyro,
                  border: BorderPyro
                },
                {
                  name: "Xiao",
                  key: "xiao",
                  page: "https://genshin.gg/characters/Xiao",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/95d3afe750cf26c310babd71c28a18c3_8863273245098889647.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Anemo,
                  border: BorderAnemo
                },
                {
                  name: "Xingqiu",
                  key: "xingqiu",
                  page: "https://genshin.gg/characters/Xingqiu",
                  image: "https://upload-os-bbs.mihoyo.com/upload/2021/03/05/63355475/32a0053ae27a4afca5a06a8842885932_855195967197924824.png?x-oss-process=image/resize,s_740/quality,q_80/auto-orient,0/interlace,1/format,jpg",
                  elemental: Hydro,
                  border: BorderHydro
                }
            ]

            ReCharName = CharName
        
            function isChar (CharName) {
                return CharName.key === ReCharName;
            }

            
            const embed = new Discord.MessageEmbed()
            .setTitle(characters.find(isChar).name)
            .setColor(characters.find(isChar).border) //Elemental Border Color
            .setDescription("This is the guide for: " + characters.find(isChar).name)
            .setImage(characters.find(isChar).image)
            .setThumbnail(characters.find(isChar).elemental)
            .setFooter('Source: ' + characters.find(isChar).page)
            // .addFields(
                //
            //)
            message.channel.send(embed);
        }


    }

)

    //EndCommands

client.login(token);