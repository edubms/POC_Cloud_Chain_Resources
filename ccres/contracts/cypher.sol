// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Cypher{

    const EthCrypto = require('eth-crypto');

    const alice = EthCrypto.createIdentity();
    const bob = EthCrypto.createIdentity();
    const secretMessage = 'My name is Satoshi Buterin';

    const signature = EthCrypto.sign(
       alice.privateKey,
       EthCrypto.hash.keccak256(secretMessage)
    );
    const payload = {
       message: secretMessage,
      signature
    };
    const encrypted = await EthCrypto.encryptWithPublicKey(
       bob.publicKey, // by encrypting with bobs publicKey, only bob can decrypt the payload with his privateKey
       JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
    );
    /*  { iv: 'c66fbc24cc7ef520a7...',
      ephemPublicKey: '048e34ce5cca0b69d4e1f5...',
     ciphertext: '27b91fe986e3ab030...',
      mac: 'dd7b78c16e462c42876745c7...'
       }
    */

    // we convert the object into a smaller string-representation
    const encryptedString = EthCrypto.cipher.stringify(encrypted);
    // > '812ee676cf06ba72316862fd3dabe7e403c7395bda62243b7b0eea5eb..'

    // now we send the encrypted string to bob over the internet.. *bieb, bieb, blob*

    // we parse the string into the object again
    const encryptedObject = EthCrypto.cipher.parse(encryptedString);

    const decrypted = await EthCrypto.decryptWithPrivateKey(
       bob.privateKey,
       encryptedObject
    );
    const decryptedPayload = JSON.parse(decrypted);

    // check signature
    const senderAddress = EthCrypto.recover(
       decryptedPayload.signature,
       EthCrypto.hash.keccak256(decryptedPayload.message)
    );

    console.log(
      'Got message from ' +
        senderAddress +
         ': ' +
     decryptedPayload.message
    );
    // > 'Got message from 0x19C24B2d99FB91C5...: "My name is Satoshi Buterin" Buterin'

    const answerMessage = 'And I am Bob Kelso';
    const answerSignature = EthCrypto.sign(
        bob.privateKey,
        EthCrypto.hash.keccak256(answerMessage)
    );
    const answerPayload = {
       message: answerMessage,
       signature: answerSignature
    };

    const alicePublicKey = EthCrypto.recoverPublicKey(
       decryptedPayload.signature,
        EthCrypto.hash.keccak256(payload.message)
    );

    const encryptedAnswer = await EthCrypto.encryptWithPublicKey(
       alicePublicKey,
       JSON.stringify(answerPayload)
    );
    // now we send the encryptedAnswer to alice over the internet.. *bieb, bieb, blob*
}


