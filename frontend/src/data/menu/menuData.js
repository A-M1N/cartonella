import laptop from "../lists-icons/laptop.png";
import mobile from "../lists-icons/mobile.png";
import pc from "../lists-icons/pc.jpeg";
import tv from "../lists-icons/tv.png";
import camera from "../lists-icons/camera.png";
import smartwatch from "../lists-icons/Smartwatch1.png";
import backgroundTech from "../lists-icons/backgroundtech.jpg";
import appleLaptop from "../lists-icons/macbook.jpg";
import alienwareLaptop from "../lists-icons/alienware.jpeg";
import asusLaptop from "../lists-icons/Asus.jpg";
import dellLaptop from "../lists-icons/dell.jpeg";
import hpLaptop from "../lists-icons/hp.jpeg";
import lenovoLaptop from "../lists-icons/lenovo.jpeg";
import msiLaptop from "../lists-icons/msi.png";

import iphone from "../lists-icons/iphone.jpg";
import samsung from "../lists-icons/Samsung.jpg";
import oppo from "../lists-icons/oppo.png";
import xiaomi from "../lists-icons/xiaomi.jpg";
import honor from "../lists-icons/honor.jpeg";

import gpu from "../lists-icons/gpu.jpg";
import cpu from "../lists-icons/cpu.jpeg";
import motherboard from "../lists-icons/motherboard.jpg";
import ram from "../lists-icons/ram.jpeg";
import ssd from "../lists-icons/ssd.jpg";
import monitor from "../lists-icons/monitor.avif";
import mousepad from "../lists-icons/mousepad.jpeg";
import mouse from "../lists-icons/mouse.jpg";
import microphone from "../lists-icons/mic.avif";
import chair from "../lists-icons/chair.jpg";

import keyboard from "../lists-icons/keyboard.jpg";
import headset from "../lists-icons/headset.jpg";

import samsungtv from "../lists-icons/samsungtv.jpg";
import lg from "../lists-icons/lgtv.jpg";
import sony from "../lists-icons/sonytv.jpeg";
import hisense from "../lists-icons/hisense.jpg";

import canon from "../lists-icons/canon.jpg";
import nikon from "../lists-icons/nikon.jpg";
import fujifilm from "../lists-icons/fujifilm.jpg";
import sonyCamera from "../lists-icons/sony.jpg";

import applewatch from "../lists-icons/applewatch.jpg";
import googlewatch from "../lists-icons/googlewatch.jpg";
import samsungwatch from "../lists-icons/samsungwatch.jpg";
import huaweiWatch from "../lists-icons/huaweiwatch.jpeg";

import videogames from "../lists-icons/gaming.jpg";
import fifa from "../lists-icons/fifa.jpg";
import arcraiders from "../lists-icons/arc.png";
import battlefield6 from "../lists-icons/battlefield6.png";
import escapefromtarkov from "../lists-icons/escapefromtarkov.jpg";
import steam from "../lists-icons/steamwp.jpg";
import ea from "../lists-icons/EA.jpg";
import battlenet from "../lists-icons/battlenet.jpg";
import callofduty from "../lists-icons/callofduty.jpeg";

import giftcards from "../lists-icons/applegift2.jpg";

import leagueoflegends from "../lists-icons/leagueoflegends.png";
import valorant from "../lists-icons/valorant.jpg";
import amazon from "../lists-icons/amazongift.png";
import googleplay from "../lists-icons/googleplaygift.png";
import applegift from "../lists-icons/applegift.jpg";

import software from "../lists-icons/windows.jpg";
import os from "../lists-icons/windows11.jpg";
import antivirus from "../lists-icons/antivirus.jpg";
import office from "../lists-icons/office.png";
import vpn from "../lists-icons/proton.png";

import subscriptions from "../lists-icons/SpotifyLogo.png";

import spotify from "../lists-icons/spotify.jpeg";
import netflix from "../lists-icons/netflix.png";
import amazongift from "../lists-icons/amazonprime.jpg";
import discord from "../lists-icons/discordnitro.jpg";
import twitch from "../lists-icons/twitch.jpg";

import backgroundGift from "../lists-icons/dbd.jpg";

import mensclothing from "../lists-icons/suit.jpg";
import suit from "../lists-icons/suit1.png";
import jacket from "../lists-icons/jacket.png";
import hoodie from "../lists-icons/hoodie.png";
import womensclothing from "../lists-icons/women.png";
import dress from "../lists-icons/dress.png";
import skirt from "../lists-icons/skirt.png";
import tshirts from "../lists-icons/tshirt.png";

import kids from "../lists-icons/kids.png";

import caps from "../lists-icons/caps.png";
import tshirtskids from "../lists-icons/tshirtkids.png";
import shoes from "../lists-icons/shoes.jpg";
import sneakers from "../lists-icons/sneakers.png";
import slippers from "../lists-icons/slippers.png";
import Runner from "../lists-icons/runner.jpg";

import perfume from "../lists-icons/perfume.png";
import VictoriaSecret from "../lists-icons/victoriaperfume.avif";
import Bathandbodyworks from "../lists-icons/bathperfume.avif";
import Gucci from "../lists-icons/gucci2.avif";
import backgroundClothes from "../lists-icons/banner.jpg";

export const menuData = [
  {
    name: "Electronics",
    slug: "electronics",
    subItems: [
      {
        name: "Laptops",
        slug: "laptops",
        img: laptop,
        nested: [
          { name: "Apple", img: appleLaptop, slug: "laptops-apple" },
          {
            name: "AlienWare",
            img: alienwareLaptop,
            slug: "laptops-alienware",
          },
          { name: "Asus", img: asusLaptop, slug: "laptops-asus" },
          { name: "Dell", img: dellLaptop, slug: "laptops-dell" },
          { name: "HP", img: hpLaptop, slug: "laptops-hp" },
          { name: "Lenovo", img: lenovoLaptop, slug: "laptops-lenovo" },
          { name: "MSI", img: msiLaptop, slug: "laptops-msi" },
        ],
      },
      {
        name: "Phones",
        slug: "phones",
        img: mobile,
        nested: [
          { name: "IPhone", img: iphone, slug: "phones-apple" },
          { name: "Samsnug", img: samsung, slug: "phones-samsung" },
          { name: "Oppo", img: oppo, slug: "phones-oppo" },
          { name: "Xiaomi", img: xiaomi, slug: "phones-xiaomi" },
          { name: "Honor", img: honor, slug: "phones-honor" },
        ],
      },
      {
        name: "PC",
        slug: "pc-components",
        img: pc,
        nested: [
          { name: "GPU", img: gpu, slug: "pc-gpu" },
          { name: "CPU", img: cpu, slug: "pc-cpu" },
          { name: "Motherboard", img: motherboard, slug: "pc-motherboard" },
          { name: "RAM", img: ram, slug: "pc-ram" },
          { name: "Monitor", img: monitor, slug: "pc-monitor" },
          { name: "Mouse", img: mouse, slug: "pc-mouse" },
          { name: "Keyboard", img: keyboard, slug: "pc-keyboard" },
          { name: "Headset", img: headset, slug: "pc-headset" },
          { name: "Microphone", img: microphone, slug: "pc-microphone" },
          { name: "Chair", img: chair, slug: "pc-chair" },
          { name: "MousePad", img: mousepad, slug: "pc-mousepad" },
          { name: "SSD", img: ssd, slug: "pc-ssd" },
        ],
      },
      {
        name: "TV",
        slug: "tv",
        img: tv,
        nested: [
          { name: "Samsung", img: samsungtv, slug: "tv-samsung" },
          { name: "LG", img: lg, slug: "tv-lg" },
          { name: "Sony", img: sony, slug: "tv-sony" },
          { name: "Hisense", img: hisense, slug: "tv-hisense" },
        ],
      },
      {
        name: "Camera",
        slug: "camera",
        img: camera,
        nested: [
          { name: "Canon", img: canon, slug: "camera-canon" },
          { name: "Nikon", img: nikon, slug: "camera-nikon" },
          { name: "Fujifilm", img: fujifilm, slug: "camera-fujifilm" },
          { name: "Sony", img: sonyCamera, slug: "camera-sony" },
        ],
      },
      {
        name: "Smart Watch",
        slug: "smart-watch",
        img: smartwatch,
        nested: [
          { name: "Apple", img: applewatch, slug: "smartwatch-apple" },
          { name: "Google", img: googlewatch, slug: "smartwatch-google" },
          { name: "Samsung", img: samsungwatch, slug: "smartwatch-samsung" },
          { name: "Huawei ", img: huaweiWatch, slug: "smartwatch-huawei" },
        ],
      },
    ],
    rightSideImg: backgroundTech,
  },
  {
    name: "Digital Products",
    slug: "digital-products",
    subItems: [
      {
        name: "Video Games",
        slug: "video-games",
        img: videogames,
        nested: [
          { name: "FIFA", img: fifa, slug: "fifa" },
          { name: "Call of Duty", img: callofduty, slug: "callofduty" },
          { name: "Arc Raiders", img: arcraiders, slug: "arcraiders" },
          { name: "Battlefield 6", img: battlefield6, slug: "battlefield" },
          {
            name: "Escape From Tarkov",
            img: escapefromtarkov,
            slug: "escapefromtarkov",
          },
          { name: "EA", img: ea, slug: "games-ea" },
          { name: "Battle.net", img: battlenet, slug: "games-battlenet" },
        ],
      },
      {
        name: "Gift Cards",
        slug: "gift-cards",
        img: giftcards,
        nested: [
          {
            name: "Steam",
            slug: "giftcards-steam",
            img: steam,
          },
          {
            name: "League Of Legends RP",
            slug: "giftcards-leagueoflegends",
            img: leagueoflegends,
          },
          {
            name: "Valorant points",
            slug: "giftcards-valorantpoints",
            img: valorant,
          },
          {
            name: "Amazon Gift Card",
            slug: "giftcards-amazon",
            img: amazon,
          },
          {
            name: "Apple Store",
            slug: "giftcards-apple",
            img: applegift,
          },
          {
            name: "Google Play Store",
            slug: "giftcards-google",
            img: googleplay,
          },
        ],
      },
      {
        name: "Software",
        img: software,
        slug: "software",
        nested: [
          {
            name: "Operating System",
            slug: "software-os",
            img: os,
          },
          {
            name: "Anti-Virus",
            slug: "software-antivirus",
            img: antivirus,
          },
          {
            name: "Office",
            slug: "software-office",
            img: office,
          },
          {
            name: "VPN",
            slug: "software-vpn",
            img: vpn,
          },
        ],
      },
      {
        name: "Subscriptions",
        slug: "subscriptions",
        img: subscriptions,
        nested: [
          { name: "Spotify", img: spotify, slug: "spotify" },
          { name: "Twitch", img: twitch, slug: "twitch" },
          { name: "Netflix", img: netflix, slug: "netflix" },
          { name: "Amazon Prime", img: amazongift, slug: "amazon-prime" },
          { name: "Discord Nitro", img: discord, slug: "discord" },
        ],
      },
    ],
    rightSideImg: backgroundGift,
  },
  {
    name: "Clothing",
    slug: "clothing",
    subItems: [
      {
        name: "Men's Clothing",
        slug: "mens-clothing",
        img: mensclothing,
        nested: [
          { name: "Suits", img: suit, slug: "mens-suits" },
          { name: "Jackets", img: jacket, slug: "mens-jackets" },
          { name: "Hoodie", img: hoodie, slug: "mens-hoodies" },
        ],
      },
      {
        name: "Women's Clothing",
        slug: "womens-clothing",
        img: womensclothing,
        nested: [
          { name: "Dress", img: dress, slug: "womens-dresses" },
          { name: "Skirts", img: skirt, slug: "womens-skirts" },
          { name: "T-shirts", img: tshirts, slug: "womens-tshirts" },
        ],
      },
      {
        name: "Kids",
        slug: "kids-clothing",
        img: kids,
        nested: [
          { name: "Caps", img: caps, slug: "kids-caps" },
          { name: "T-shirts", img: tshirtskids, slug: "kids-tshirts" },
        ],
      },
      {
        name: "Shoes",
        slug: "shoes",
        img: shoes,
        nested: [
          { name: "Sneakers", img: sneakers, slug: "sneakers" },
          { name: "Slippers", img: slippers, slug: "slippers" },
          { name: "Runner", img: Runner, slug: "runner" },
        ],
      },
      {
        name: "Perfumes",
        slug: "perfumes",
        img: perfume,
        nested: [
          {
            name: "Victoria Secret",
            img: VictoriaSecret,
            slug: "victoriasecret",
          },
          {
            name: "Bath and Body Works",
            img: Bathandbodyworks,
            slug: "bath-and-body-works",
          },
          { name: "Gucci", img: Gucci, slug: "gucci" },
        ],
      },
    ],
    rightSideImg: backgroundClothes,
  },
];
