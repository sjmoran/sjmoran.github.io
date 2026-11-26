import numpy as np, matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt, matplotlib.tri as mtri
from matplotlib.colors import LinearSegmentedColormap
from scipy.stats import dirichlet
V=np.array([[0,0],[1,0],[.5,np.sqrt(3)/2]])
tri=mtri.Triangulation(V[:,0],V[:,1]); tri=mtri.UniformTriRefiner(tri).refine_triangulation(subdiv=7)
P=np.stack([tri.x,tri.y],1)
def bary(p):
    T=np.array([V[0]-V[2],V[1]-V[2]]).T; l=np.linalg.solve(T,(p-V[2]).T).T
    b=np.c_[l,1-l.sum(1)]; return np.clip(b,1e-4,1)/np.clip(b,1e-4,1).sum(1,keepdims=True)
a=np.array([4,4,4.]); z=np.array([dirichlet.pdf(b,a) for b in bary(P)])
cm=LinearSegmentedColormap.from_list("rm",["#3e9e98","#7cc3a4","#f0d27a","#f4a14a","#e86a2c"])
fig=plt.figure(figsize=(8,8),dpi=100); ax=fig.add_axes([0,0,1,1]); fig.patch.set_facecolor("#ffffff")
ax.tricontourf(tri,z,levels=60,cmap=cm); ax.tricontour(tri,z,levels=14,colors="#2d5f5b",linewidths=.6,alpha=.45)
rng=np.random.default_rng(3); s=rng.dirichlet(a,90); xy=s@V
ax.scatter(xy[:,0],xy[:,1],s=14,c="#b3472a",alpha=.75,lw=0)
c=V.mean(0); ax.plot(*c,marker="*",ms=48,color="white",mec="white")
ax.plot(*np.r_[V,V[:1]].T,color="#2d5f5b",lw=2)
ax.set_xlim(-.06,1.06); ax.set_ylim(-.13,.996); ax.set_aspect("equal"); ax.axis("off")
fig.savefig("avatar.png",dpi=100,facecolor=fig.get_facecolor())
