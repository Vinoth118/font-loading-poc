import { Flex, Text } from "@chakra-ui/react";
import Link from 'next/link'
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();

    return <Flex bg = "white" zIndex={9} position={"sticky"} top = "0px" w = "100%" boxShadow={"rgba(33, 35, 38, 0.1) 0px 10px 10px -10px"} py = "15px" justifyContent={"center"} alignItems={"start"}>

        <Flex>
            <Link href="/">
                <a>
                    <Flex direction={"column"}>
                        <Text color = {router.pathname == '/' ? "green" : "black"}>Home</Text>
                        <Flex display={router.pathname == '/' ? "flex" : "none"} mt = "5px" bg = "black" h = "3px" borderRadius={"100%"} w = "100%"></Flex>
                    </Flex>
                </a>
            </Link>
        </Flex>
        <Flex ml = "20px">
            <Link href="/page_1">
                <a>
                    <Flex direction={"column"}>
                        <Text color = {router.pathname == '/page_1' ? "green" : "black"}>Page 1</Text>
                        <Flex display={router.pathname == '/page_1' ? "flex" : "none"} mt = "5px" bg = "black" h = "3px" borderRadius={"100%"} w = "100%"></Flex>
                    </Flex>
                </a>
            </Link>
        </Flex>
        <Flex ml = "20px">
            <Link href="/page_2">
                <a>
                    <Flex direction={"column"}>
                        <Text color = {router.pathname == '/page_2' ? "green" : "black"}>Page 2</Text>
                        <Flex display={router.pathname == '/page_2' ? "flex" : "none"} mt = "5px" bg = "black" h = "3px" borderRadius={"100%"} w = "100%"></Flex>
                    </Flex>
                </a>
            </Link>
        </Flex>
    </Flex>
}

export default Header;