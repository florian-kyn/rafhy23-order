//Stocks.js//
const discord = require("discord.js");
const {Fmp} = require("../api/Fmp.js");

class Stocks {
    constructor(message, client, config, language) {
        this.message = message;
        this.client = client;
        this.args = message.content.slice().split(/ /); // init the var which contain the message/command args
        this.prefix = config.client.prefix; // get the prefix from config.json file
        this.config = config;
        this.language = language.stocks;
    }
    selector() {
        if(this.message.author.id !== this.client.user.id && this.message.channel.type !== "dm") {
            switch (this.args[0].toLowerCase()) {
                case this.prefix + "stock": // ?stock AAPL
                    this.stock();
                    break;
                case this.prefix + "bio":
                    this.bio();
                    break;
                case this.prefix + "financials":
                    this.financial();
                    break;
                case this.prefix + "divinfo":
                    this.divInfo();
                    break;
                case this.prefix + "help":
                    this.message.channel.send(this.embeds("help")).then().catch(console.error);
                    break;
            }
        }
    }
    async stock() {
        let Info = [];
        if(typeof this.args[1] !== "undefined") {
            await new Fmp(this.config, this.client).fmpQuery(`https://financialmodelingprep.com/api/v3/profile/${this.args[1]}?apikey=`).then(async (info) => {
                if(info.length >= 1) {
                    await Info.push(info)
                } else {
                    this.message.channel.send(this.language.stock.messageError[1]).then(message => message.delete({timeout: 10000})).catch(console.error);
                }
            });

            await new Fmp(this.config, this.client).forceFetch(`https://financialmodelingprep.com/api/v3/quote/${this.args[1].toUpperCase()}?apikey=db25b5705aee1f644bdc325497affc04`).then(async (info) => {
                if(info.length >= 1) {
                    await Info.push(info)
                } else {
                    this.message.channel.send(this.language.stock.messageError[1]).then(message => message.delete({timeout: 10000})).catch(console.error);
                }
            });
            try {
                await this.message.channel.send(this.embeds("stock", Info)).then().catch(console.error);
            } catch (e) {

            }
        } else { // stock name not specified
            this.message.channel.send(this.language.stock.messageError[0]).then(message => message.delete({timeout: 10000})).catch(console.error);
        }
    }
    async bio() {
        let Info = [];
        if(typeof this.args[1] !== "undefined") {
            await new Fmp(this.config, this.client).fmpQuery(`https://financialmodelingprep.com/api/v3/profile/${this.args[1]}?apikey=`).then(async (info) => {
                if(info.length >= 1) {
                    await Info.push(info)
                } else {
                    this.message.channel.send(this.language.stock.messageError[1]).then(message => message.delete({timeout: 10000})).catch(console.error);
                }
            });
            try {
                await this.message.channel.send(this.embeds("bio", Info)).then().catch(console.error);
            } catch (e) {

            }
        } else { // stock name not specified
            this.message.channel.send(this.language.stock.messageError[0]).then(message => message.delete({timeout: 10000})).catch(console.error);
        }
    }
    async financial() {
        let Info = [];
        if(typeof this.args[1] !== "undefined") {
            await new Fmp(this.config, this.client).fmpQuery(`https://financialmodelingprep.com/api/v3/profile/${this.args[1].toUpperCase()}?apikey=`).then(async (info) => {
                if(info.length >= 1) {
                    await Info.push(info)
                } else {
                    this.message.channel.send(this.language.stock.messageError[1]).then(message => message.delete({timeout: 10000})).catch(console.error);
                }
            });

            await new Fmp(this.config, this.client).forceFetch(`https://financialmodelingprep.com/api/v3/income-statement/${this.args[1].toUpperCase()}?limit=1&apikey=db25b5705aee1f644bdc325497affc04`).then(async (info) => {
                if(info.length >= 1) {
                    await Info.push(info)

                } else {
                    this.message.channel.send(this.language.stock.messageError[1]).then(message => message.delete({timeout: 10000})).catch(console.error);
                }
            });

            try {
                await this.message.channel.send(this.embeds("financial", Info)).then().catch(console.error);
            } catch (e) {

            }
        } else { // stock name not specified
            this.message.channel.send(this.language.stock.messageError[0]).then(message => message.delete({timeout: 10000})).catch(console.error);
        }
    }
    async divInfo() {
        let Info = [];
        if(typeof this.args[1] !== "undefined") {
            await new Fmp(this.config, this.client).fmpQuery(`https://financialmodelingprep.com/api/v3/profile/${this.args[1].toUpperCase()}?apikey=`).then(async (info) => {
                if(info.length >= 1) {
                    await Info.push(info)
                } else {
                    this.message.channel.send(this.language.stock.messageError[1]).then(message => message.delete({timeout: 10000})).catch(console.error);
                }
            });

            await new Fmp(this.config, this.client).forceFetch(`https://financialmodelingprep.com/api/v3/income-statement/${this.args[1].toUpperCase()}?limit=1&apikey=db25b5705aee1f644bdc325497affc04`).then(async (info) => {
                if(info.length >= 1) {
                    await Info.push(info)

                } else {
                    this.message.channel.send(this.language.stock.messageError[1]).then(message => message.delete({timeout: 10000})).catch(console.error);
                }
            });

            try {
                await this.message.channel.send(this.embeds("financial", Info)).then().catch(console.error);
            } catch (e) {

            }
        } else { // stock name not specified
            this.message.channel.send(this.language.stock.messageError[0]).then(message => message.delete({timeout: 10000})).catch(console.error);
        }
    }
    embeds(Case, info=null) {
        let nbCalc = nb => {
            if(nb.length === 13) {
                return `${nb.charAt(0)}.${nb.charAt(1)}${nb.charAt(2)}T`;
            } else if(nb.length === 12) {
                return `${nb.charAt(0)}${nb.charAt(1)}${nb.charAt(2)}.${nb.charAt(3)}${nb.charAt(4)}B`;
            } else if(nb.length === 11) {
                return `${nb.charAt(0)}${nb.charAt(1)}.${nb.charAt(2)}${nb.charAt(3)}B`;
            } else if(nb.length === 10) {
                return `${nb.charAt(0)}.${nb.charAt(1)}${nb.charAt(2)}B`;
            } else if(nb.length === 9) {
                return `${nb.charAt(0)}${nb.charAt(1)}${nb.charAt(2)}.${nb.charAt(3)}${nb.charAt(4)}M`;
            } else if(nb.length === 8) {
                return `${nb.charAt(0)}${nb.charAt(1)}.${nb.charAt(2)}${nb.charAt(3)}M`;
            } else if(nb.length === 7) {
                return `${nb.charAt(0)}.${nb.charAt(1)}${nb.charAt(2)}M`;
            } else if(nb.length >= 6) {
                return `${nb}`;
            } else if(nb.length >= 3){
                return `${nb}`;
            }
        }
        switch (Case) {
            case "help":
                return new discord.MessageEmbed()
                    .setAuthor(this.client.user.username, this.client.user.avatarURL())
                    .setThumbnail(this.message.guild.member(this.message.author.id).user.avatarURL())
                    .setColor("BLUE")
                    .addFields(
                        {name: "`" + `${this.prefix}stock <symbol>` + "`", value: this.language.help.embed.commandDesc[0], inline: false},
                        {name: "`" + `${this.prefix}bio <symbol>` + "`", value: this.language.help.embed.commandDesc[1], inline: false},
                        {name: "`" + `${this.prefix}financials <symbol>` + "`", value: this.language.help.embed.commandDesc[2], inline: false},
                    )
                    .setTimestamp()
            case "stock":
                return new discord.MessageEmbed()
                    .setAuthor(`Stock: ${info[0][0].symbol}`, this.client.user.avatarURL())
                    .setThumbnail(info[0][0].image)
                    .setTitle(info[0][0].companyName + ` - ${info[0][0].country} | ${info[0][0].sector}`)
                    .setURL(info[0][0].website)
                    .setColor("BLUE")
                    .addFields(
                        {name: "`" + this.language.stock.embeds.fieldName[0] + "`", value: "- $" + info[0][0].price, inline: true},
                        {name: "`" + this.language.stock.embeds.fieldName[1] + "`", value: info[0][0].changes + "%", inline: true},
                        {name: "`" + this.language.stock.embeds.fieldName[2] + "`", value: "- " + info[0][0].volAvg, inline: true},
                        {name: "`" + this.language.stock.embeds.fieldName[3] + "`", value: "- " + nbCalc(`${info[1][0].marketCap}`), inline: true},
                        {name: "`" + this.language.stock.embeds.fieldName[4] + "`", value: "- " + nbCalc( `${info[1][0].sharesOutstanding}`), inline: true},
                        {name: "`" + this.language.stock.embeds.fieldName[5] + "`", value: "- " + info[1][0].volume, inline: true}
                    )
                    .setTimestamp()
            case "bio":
                let bio = "";
                for(let i = 0; 1020 > i; i++) {
                    bio += info[0][0].description.charAt(i)
                }
                return new discord.MessageEmbed()
                    .setAuthor(`Stock: ${info[0][0].symbol}`, this.client.user.avatarURL())
                    .setThumbnail(info[0][0].image)
                    .setTitle(info[0][0].companyName + ` - ${info[0][0].country} | ${info[0][0].sector}`)
                    .setURL(info[0][0].website)
                    .setColor("BLUE")
                    .addFields(
                        {name: "`" + this.language.bio.embeds.fieldName[0] + "`", value: "- " + info[0][0].sector, inline: true},
                        {name: "`" + this.language.bio.embeds.fieldName[1] + "`", value: "- " + info[0][0].industry, inline: true},
                        {name: "`" + this.language.bio.embeds.fieldName[2] + "`", value: "- " + info[0][0].ceo, inline: true},
                        {name: "`" + this.language.bio.embeds.fieldName[3] + "`", value: "- " + info[0][0].state.toLowerCase(), inline: true},
                        {name: "`" + this.language.bio.embeds.fieldName[4] + "`", value: "- " + info[0][0].city, inline: true},
                        {name: "`" + this.language.bio.embeds.fieldName[5] + "`", value: "- " + nbCalc(`${info[0][0].fullTimeEmployees}`), inline: true},
                        {name: "`" + this.language.bio.embeds.fieldName[6] + "`", value: "- " + bio, inline: false}
                    )
                    .setFooter(info[0][0].company, info[0][0].image)
                    .setTimestamp()
            case "financial":
                return new discord.MessageEmbed()
                    .setAuthor(`Stock: ${info[0][0].symbol}`, this.client.user.avatarURL())
                    .setThumbnail(info[0][0].image)
                    .setTitle(info[0][0].companyName + ` - ${info[0][0].country} | ${info[0][0].sector}`)
                    .setURL(info[0][0].website)
                    .setColor("BLUE")
                    .addFields(
                        {name: "`" + this.language.financial.embeds.fieldName[0] + "`", value: "- $" + nbCalc(`${info[1][0].revenue}`), inline: true},
                        {name: "`" + this.language.financial.embeds.fieldName[1] + "`", value: "- $" + nbCalc(`${info[1][0].netIncome}`), inline: true},
                        {name: "`" + this.language.financial.embeds.fieldName[2] + "`", value: "- $" + nbCalc(`${info[1][0].grossProfit}`), inline: true},
                        {name: "`" + this.language.financial.embeds.fieldName[3] + "`", value: "- $" + nbCalc(`${info[1][0].incomeBeforeTax}`), inline: true},
                        {name: "`" + this.language.financial.embeds.fieldName[4] + "`", value: "- " + `${info[1][0].netIncomeRatio}`, inline: true},
                        {name: "`" + this.language.financial.embeds.fieldName[5] + "`", value: "- " + `${info[1][0].grossProfitRatio}`, inline: true},
                    )
                    .setFooter(`Years: ${info[1][0].date}`, info[0][0].image)
                    .setTimestamp()
        }
    }
}
module.exports = {
    Stocks
}
