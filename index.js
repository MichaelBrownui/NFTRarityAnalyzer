const fs = require('fs-extra');
const axios = require('axios');

class NFTRarityAnalyzer {
    constructor() {
        this.collection = [];
        this.attributes = {};
    }

    async loadCollection(filePath) {
        try {
            const data = await fs.readJson(filePath);
            this.collection = data;
            console.log(`Loaded ${this.collection.length} NFTs`);
            return true;
        } catch (error) {
            console.error('Error loading collection:', error.message);
            return false;
        }
    }

    analyzeAttributes() {
        console.log('Analyzing collection attributes...');
        
        this.collection.forEach(nft => {
            if (nft.attributes) {
                nft.attributes.forEach(attr => {
                    const traitType = attr.trait_type;
                    const value = attr.value;
                    
                    if (!this.attributes[traitType]) {
                        this.attributes[traitType] = {};
                    }
                    
                    if (!this.attributes[traitType][value]) {
                        this.attributes[traitType][value] = 0;
                    }
                    
                    this.attributes[traitType][value]++;
                });
            }
        });
        
        console.log('Attribute analysis complete');
    }

    calculateRarity(tokenId) {
        const nft = this.collection.find(item => item.token_id === tokenId);
        if (!nft) {
            console.log('NFT not found');
            return null;
        }

        let totalRarity = 0;
        const collectionSize = this.collection.length;

        if (nft.attributes) {
            nft.attributes.forEach(attr => {
                const traitType = attr.trait_type;
                const value = attr.value;
                const traitCount = this.attributes[traitType][value];
                const rarity = (traitCount / collectionSize) * 100;
                
                console.log(`${traitType}: ${value} (${rarity.toFixed(2)}% have this trait)`);
                totalRarity += rarity;
            });
        }

        const averageRarity = totalRarity / nft.attributes.length;
        console.log(`Average rarity: ${averageRarity.toFixed(2)}%`);
        
        return averageRarity;
    }
}

module.exports = NFTRarityAnalyzer;

if (require.main === module) {
    console.log('NFT Rarity Analyzer initialized');
}