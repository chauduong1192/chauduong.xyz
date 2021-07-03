import React from "react"
import get from "lodash/get"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import media from "styled-media-query";

import Layout from "../components/layout"
import SEO from "../components/seo-tag"
import Container from "../components/container"

const GithubWrap = styled.a`
  width: 300px;
  height: 100px;
  cursor: pointer;
  transition: background 0.5s;

  ${media.lessThan("medium")`
    width: 100%;
  `}

  &:hover {
    background: #ffffff87;
  }

  & .overflow-x-scroll::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
  }
  
`;

const GithubRepos = () => {
  const githubQuery = useStaticQuery(
    graphql`
      query {
        # github {
        #   user(login: "chauduong1192") {
        #     pinnedItems(first: 10) {
        #       edges {
        #         node {
        #           ... on GitHub_Repository {
        #             id
        #             name
        #             languages(first: 10) {
        #               edges {
        #                 node {
        #                   id
        #                   name
        #                 }
        #               }
        #             }
        #             description
        #             stargazers(first: 10) {
        #               totalCount
        #             }
        #             resourcePath
        #           }
        #         }
        #       }
        #     }
        #   }
        # }
        github {
          viewer {
            name
            starredRepositories(first: 20) {
              edges {
                node {
                  id
                  name
                  stargazers(first: 20) {
                    totalCount
                  }
                  description
                  resourcePath
                }
                cursor
              }
              totalCount
            }
          }
        }
      }
    `
  )
  const repos = get(githubQuery, "github.viewer.starredRepositories.edges")

  const renderGitHubList = () => {
    return repos.map(({ node }) => (
      <GithubWrap
        key={node.id}
        className="flex flex-col justify-around flex-wrap bg-white rounded p-3 mb-5 mr-0 sm:w-full sm:mr-3"
        href={`https://github.com${node.resourcePath}`}
        target="_blank"
      >
        <div className="text-base text-lg text-black-52x3 font-medium mb-1 flex items-center">
          <div className="flex-grow">{node.name}</div>
          <div className="flex-grow-0 text-sm">
            {node.stargazers?.totalCount} &#9829;
          </div>
        </div>
        <div className="mb-4 truncate w-full text-sm">{node.description}</div>
        <div className="flex flex-row flex-no-wrap w-full overflow-x-scroll">
          {node.languages?.edges.slice(0, 4).map(({ node }) => (
            <div
              key={node.id}
              className=" last:mr-0 mr-2 rounded bg-primary py-1 px-3 text-sm text-black-52x3"
            >
              {node.name}
            </div>
          ))}
        </div>
      </GithubWrap>
    ))
  }
  return (
    <Layout>
      <SEO title="Github Repos" />
      <Container>
        <h1 className="text-black-52x3 font-medium mb-3 sm:mb-6 font-roboto text-2xl sm:text-4xl">
          Repositories
        </h1>
        <div className="flex justify-start flex-wrap">
          {renderGitHubList()}
        </div>

        <div class="flex flex-col items-center my-12">
    <div class="flex text-gray-700">
        <div class="h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left w-4 h-4">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </div>
        <div class="flex h-8 font-medium rounded-full bg-gray-200">
            <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">1</div>
            <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">...</div>
            <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">3</div>
            <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full bg-pink-600 text-white ">4</div>
            <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">5</div>
            <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">...</div>
            <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ">15</div>
            <div class="w-8 h-8 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-pink-600 text-white">4</div>
        </div>
        <div class="h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right w-4 h-4">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </div>
    </div>
</div>
      </Container>
    </Layout>
  )
}

export default GithubRepos
