console.time('github++')

let navTabs = document.querySelector('.UnderlineNav-body')
let codeTab = navTabs?.children[0]

if (codeTab) {
    const repoUrl = document.querySelector('meta[property="og:url"').getAttribute('content')
    const repoName = document.querySelector('meta[name="octolytics-dimension-repository_nwo"').getAttribute('content')
    const selectedLink = document.querySelector('meta[name="selected-link"').getAttribute('value')
    const isReleasesSelected = selectedLink === 'repo_releases'
    const isCodeSelected = selectedLink === 'repo_source'
console.log(repoName)
    let releaseTab = codeTab.cloneNode(true)
    let releaseTabAnchor = releaseTab.firstElementChild
    let releaseTabSvg = releaseTabAnchor.firstElementChild
    let releaseTabName = releaseTabAnchor.children[1]

    let releaseTabText = "Releases"

    // Get release count
    if (isCodeSelected) {
        const releaseSidePanel = document.querySelector('.BorderGrid-cell a[href$="/releases"]')
        if (releaseSidePanel) {
            console.log('SET IT', releaseSidePanel)
            releaseTabText = releaseSidePanel.innerHTML
            chrome.storage.local.set({ [repoName]: { releaseTabText }});
        }
    } else {
        chrome.storage.local.get(repoName, function(data) {
            console.log('DATA', data)
            if (data[repoName]?.releaseTabText) {
                console.log('GET IT')
                releaseTabName.innerHTML = data[repoName].releaseTabText
            }
        });
    }

    // Insert Releases tab
    navTabs.insertBefore(releaseTab, navTabs.children[1])

    //Edit release tab 
    releaseTabSvg.firstElementChild.setAttribute('d', 'M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z')

    // Edit Name
    releaseTabName.setAttribute('data-content', 'Releases')
    releaseTabName.innerHTML = releaseTabText

    // Edit link
    releaseTabAnchor.setAttribute('data-tab-item', 'releases-tab')
    releaseTabAnchor.setAttribute('href', `${repoUrl}/releases`)
    releaseTabAnchor.setAttribute('data-hotkey', 'g r')
    releaseTabAnchor.setAttribute('data-selected-links', 'repo_releases /SeanReece/pr-reporter-slack/releases')

    if (isReleasesSelected) {
        const codeTabAnchor = codeTab.firstElementChild
        codeTabAnchor.classList.remove('selected')
        codeTabAnchor.removeAttribute('aria-current')
    } else {
        releaseTabAnchor.classList.remove('selected')
        releaseTabAnchor.removeAttribute('aria-current')
    }
}

console.timeEnd('github++')
