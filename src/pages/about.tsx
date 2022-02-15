import Parser from 'rss-parser'
import {useEffect, useState} from "react";
import Link from 'next/link';
import Image from "next/image";

const about = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getFeeds = () => {
            type CustomFeed = {}
            type CustomItem = { description: string }
            const parser: Parser<CustomFeed, CustomItem> = new Parser({
                customFields: {
                    item: ['description']
                }
            })
            parser.parseURL("https://proxy.knulst.de/medium", function (err, feed) {
                const data = []
                let maxStories = 6
                feed.items.forEach(item => {
                    if (maxStories === 0) {
                        return
                    }
                    console.log(item)
                    console.log(item.description)
                    data.push({
                        title: item.title,
                        link: item.link.substring(0, item.link.indexOf('?')),
                        snippet: item.contentSnippet
                    })
                    maxStories -= 1
                })
                setData(data)
            })
        };
        getFeeds()
    }, [])

    return (
        <div className="grid h-auto gap-5 p-6 lg:px-24 md:grid-cols-2 bg-slate-700">
            <div className="textBlock-wrapper-top">
                <h1 className="textBlock-title">
                    <span className="font-bold text-cyan-400">Who is </span>Paul Knulst?
                </h1>
                <p className="textBlock-subtitle">Husband, father of two, geek, lifelong learner, tech lover, software
                    engineer and NFT creator. <br/>
                    Writing at <Link href="https://paulknulst.medium.com">
                        <a className="hover:text-blue-700 cursor-pointer text-yellow-400" target="_blank">Medium</a>
                    </Link> about projects and challenges in IT.</p>
                <p className="textBlock-subtitle">Connect with me on <Link href="https://linkedin.com/in/paulknulst">
                    <a className="hover:text-blue-700 cursor-pointer text-yellow-400" target="_blank">LinkedIn</a>
                </Link>
                </p>
                <Image
                    src="/1604.png"
                    alt="CryptoFace 1604"
                    height={360}
                    width={360}
                    objectFit="contain"
                    quality={100}
                />
                <Image
                    src="/3077.png"
                    alt="CryptoFace 3077"
                    height={360}
                    width={360}
                    objectFit="contain"
                    quality={100}
                />
            </div>
            <div className="flex flex-col space-y-3">
                <Image
                    src="/2916.png"
                    alt="CryptoFace 2916"
                    height={360}
                    width={360}
                    objectFit="contain"
                    quality={100}
                />
                <h2 className="text-4xl">Some recent articles</h2>
                {data.map((d, i) => (
                    <div
                        className="flex-wrap px-6 py-3 text-base bg-gray-dark"
                        key={i}
                    >
                        <Link href={d.link}>
                            <a className="hover:text-cyan-400 cursor-pointer text-yellow-400">{d.title}</a>
                        </Link>
                        <div className="px-5">
                            {d.snippet.substring(0, d.snippet.indexOf("Continue reading"))}
                        </div>
                    </div>

                ))
                }
            </div>
        </div>
    );
};

export default about;